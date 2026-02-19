import { v4 } from 'uuid';
import User from '../models/User.js';
import * as Yup from 'yup';
import Bcrypt from 'bcrypt';

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.error });
    }

    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return response
        .status(400)
        .json({ message: 'This email address is already registered!' });
    }

    const password_hash = await Bcrypt.hash(password, 10);

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
    });

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new UserController();

/*store -> cria dado
index -> lista todos os dados
show -> listar um dado
update -> atualiza dados
delete -> remover dados
*/
