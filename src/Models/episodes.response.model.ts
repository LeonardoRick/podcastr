/* eslint-disable camelcase */
// response interfaces should have cammel_case allowed
export interface EpisodesResponse {
    data: {
        id: string;
        title: string;
        members: string;
        thumbnail: string;
        published_at: string;
        description: string;
        file: {
            url: string;
            duration: string;
        }
    }[]
}
