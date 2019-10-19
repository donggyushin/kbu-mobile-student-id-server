import rsa from 'js-crypto-rsa';

export const decryptRsaMessage = async (privKey, encrypted) => {

    try {
        const decrypted = await rsa.decrypt(
            encrypted,
            privKey,
            'OAEP',
            {
                name: 'RSASSA-PKCS1-v1_5'
            }
        )

        return decrypted
    } catch (err) {
        return 'failed to decrypt, error:' + err.message
    }


}