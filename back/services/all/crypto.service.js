import sha1 from 'sha1';
const salt= 1358;// need moove to .env
class CryptoService{
    constructor(){}
    hash = input => sha1(sha1(input) + sha1(salt))
};
export default new CryptoService();