import BaseService from '../services/base.service';

const establishService = async <T extends BaseService>(
    serviceClass: new (sessionToken: string) => T,
    sessionToken: string,
): Promise<T> => {
    const service = new serviceClass(sessionToken);
    await service.setSessionUserId();
    return service;
};

export default establishService;
