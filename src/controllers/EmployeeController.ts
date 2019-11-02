import { RequestHandler } from '@appTypes/RequestTypes';

import { Employee } from '@entities';

import { checkPassword, createAccessToken } from '@utils/authHelpers';

export class EmployeeController {
    static login: RequestHandler<Promise<any>> = async (req, res) => {
        try {
            const { username, password } = req.body;
            const employee = await Employee.findOneOrFail({ username });

            if (!(await checkPassword(password, employee.password)))
                throw new Error('Authentication error');

            res.status(200).send(createAccessToken({ employeeId: employee.employeeId }));
        } catch (error) {
            console.log(error);
            res.status(400).send({ error: error['message'] ? error['message'] : error });
        }
    };
}
