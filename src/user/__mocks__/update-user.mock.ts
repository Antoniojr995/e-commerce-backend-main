import { UpdatePasswordDTO } from "../dtos/update-password.dto";

export const updatePasswordMock: UpdatePasswordDTO = {
    lastPassword: 'abc',
    newPassword: 'novaSenhaMock'
}

export const updatePasswordInvalidMock: UpdatePasswordDTO = {
    lastPassword: 'dakmda',
    newPassword: 'augdja'
}