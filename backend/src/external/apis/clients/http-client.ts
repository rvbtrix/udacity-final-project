import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const httpClient = axios.create({ httpsAgent });

export type WebApiRequestConfig = AxiosRequestConfig;
export type WebApiResponse<T> = AxiosResponse<T>;

interface IWebApiClient {
    post<T = any>(urlPath: string, bodyData?: any, requestConfig?: WebApiRequestConfig): Promise<WebApiResponse<T>>;
    get<T = any>(urlPath: string, uriPath: string, requestConfig?: WebApiRequestConfig): Promise<WebApiResponse<T>>;
    patch<T = any>(urlPath: string, idItem: string, bodyData?: any, requestConfig?: WebApiRequestConfig): Promise<WebApiResponse<T>>;
    delete<T = any>(urlPath: string, idItem: string, requestConfig?: WebApiRequestConfig): Promise<WebApiResponse<T>>;
}

/**
 *
 */
class HttpClient implements IWebApiClient {
    public authrorization: string;

    /**
     *
     * @param urlPath
     * @param uriPath
     * @param requestConfig
     */
    public get<T = any>(urlPath: string, uriPath: string, requestConfig?: AxiosRequestConfig): Promise<WebApiResponse<T>> {
        console.log('httpClient.get', `${urlPath}/${uriPath}`);
        
        return httpClient.get(`${urlPath}/${uriPath}`, this.configRequest(requestConfig));
    }

    /**
     *
     * @param urlPath
     * @param idItem
     * @param bodyData
     * @param requestConfig
     */
    public patch<T = any>(urlPath: string, idItem: string, bodyData?: any, requestConfig?: AxiosRequestConfig): Promise<WebApiResponse<T>> {
        console.log('httpClient.patch', `${urlPath}/${idItem}`);

        return httpClient.patch(`${urlPath}/${idItem}`, bodyData, this.configRequest(requestConfig));
    }

    /**
     *
     * @param urlPath
     * @param idItem
     * @param requestConfig
     */
    public delete<T = any>(urlPath: string, idItem: string, requestConfig?: AxiosRequestConfig): Promise<WebApiResponse<T>> {
        console.log('httpClient.delete', `${urlPath}/${idItem}`);

        return httpClient.delete(`${urlPath}/${idItem}`, this.configRequest(requestConfig));
    }

    /**
     *
     * @param url
     * @param data
     * @param requestConfig
     */
    public post(url: string, data: any, requestConfig?: WebApiRequestConfig) {
        console.log('httpClient.post', `${url}`);
        
        return httpClient.post(url, data, this.configRequest(requestConfig));
    }

    /**
     * Adicionar opções na requisição
     *
     * @param {WebApiRequestConfig} customConfig
     */
    private configRequest(customConfig?: WebApiRequestConfig): WebApiRequestConfig {
        return {
            ...customConfig,
            headers: {
                ...(customConfig ? customConfig.headers : {}),
            },
        };
    }
}

export const httpClientApi: IWebApiClient = new HttpClient();
