import type { NextApiRequest, NextApiResponse } from 'next';
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
