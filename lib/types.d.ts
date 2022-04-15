import type { NextApiRequest, NextApiResponse } from 'next';
import type { FC } from 'react';
type Endpoint = (req: NextApiRequest, res: NextApiResponse) => any;

interface UserSession {
  userId: string;
  username: string;
}

type Login = {
  identity: string;
  password: string;
};

type Signup = {
  username: string;
  password: string;
  email: string;
};

declare module 'tabler-icons-react/dist/icons/*.js' {
  const Icon: FC<{ size: number }>;
  export default Icon;
}
