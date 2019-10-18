import VerifyPhoneModel from '../models/VerifyPhone'
import { generateRandomNumber } from '../utils/generateRandomNumber'
import { sendSMSMEssage } from '../utils/SendSMS'

export const VerifyCode = async (req, res) => {
    const {
        verifyCode,
        phoneNumber
    } = req.body;

    try {
        const verifyPhone = await VerifyPhoneModel.findOne({
            number: phoneNumber
        })
        // nexmo 해결될때까지만 임시방편
        if (verifyCode === '0629') {
            res.json({
                ok: true,
                error: null
            })
            return;
        }

        if (verifyPhone.key === verifyCode) {
            res.json({
                ok: true,
                error: null
            })
            return;
        } else {
            res.json({
                ok: false,
                error: '인증번호가 틀렸습니다. '
            })
            return;
        }
    } catch (err) {
        res.json({
            ok: false,
            error: err.message
        })
        return;
    }


}

export const AllocateVerifyKeyAndSendSMS = async (req, res) => {
    const {
        name,
        studentId,
        phoneNumber,
    } = req.body

    try {

        const foundVerifyPhone = await VerifyPhoneModel.findOne({
            number: phoneNumber
        })

        if (foundVerifyPhone) {
            if (foundVerifyPhone.verified) {
                res.json({
                    ok: false,
                    error: '이미 인증이 완료된 전화번호입니다. '
                })
                return;
            } else {
                foundVerifyPhone.key = generateRandomNumber();
                await foundVerifyPhone.save()

                const convertedPhoneNumber = "82" + phoneNumber.substr(1);
                sendSMSMEssage(convertedPhoneNumber, `인증번호 확인란에 ${foundVerifyPhone.key} 를 입력해주세요. `);

                res.json({
                    ok: true,
                    error: null
                })
                return
            }
        }

        const verifyPhone = await new VerifyPhoneModel({
            number: phoneNumber,
            name,
            studentId
        })

        verifyPhone.key = generateRandomNumber();
        await verifyPhone.save()

        const convertedPhoneNumber = "82" + phoneNumber.substr(1);

        sendSMSMEssage(convertedPhoneNumber, `인증번호 확인란에 ${verifyPhone.key} 를 입력해주세요. `);

        res.json({
            ok: true,
            error: null
        })

    } catch (err) {
        res.json({
            ok: false,
            error: err.message
        })
    }



}