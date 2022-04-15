import {
  AppShell,
  Card,
  Center,
  TextInput,
  Button,
  Stack,
  InputWrapper,
  Header,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { fetchJson } from '../lib/client';
import { identity } from '../lib/common';
import { secureSession } from '../lib/server';

const enum Action {
  login,
  signUp,
}

async function login(
  payload: { identity: string; password: string },
  { asVendor } = { asVendor: false }
) {
  const res = await fetchJson(`/api/login${asVendor ? '?type=vendor' : ''}`, payload, {
    method: 'POST',
  });
  if (res.status < 400) return null;
  return new Error(await res.text());
}

async function signup(
  payload: { username: string; password: string; email?: string },
  { asVendor } = { asVendor: false }
) {
  const res = await fetchJson(`/api/signup${asVendor ? '?type=vendor' : ''}`, payload, {
    method: 'POST',
  });
  if (res.status < 400) return null;
  return new Error(await res.text());
}

export const getServerSideProps = secureSession(async ({ req }) => {
  if (req.session.user) return { redirect: '/homepage', props: {} };
  return {
    props: {},
  };
});

const emailRegex = /[^@]+@[^.]+\..+/;

export default function Login() {
  const router = useRouter();
  const [action, setAction] = useState(
    router.query.action == 'signup' ? Action.signUp : Action.login
  );
  const [error, setError] = useState('');
  const form = useForm({
    initialValues: {
      identity: '',
      password: '',
      email: '',
      confirmPassword: '',
    },
    validationRules: {
      identity: identity,
      password: identity,
      email: (value) => action !== Action.signUp || emailRegex.test(value),
      confirmPassword: (value, values) => action !== Action.signUp || value === values?.password,
    },
    errorMessages: {
      identity: 'Username required',
      password: 'Password required',
      email: 'Email required, or invalid email',
      confirmPassword: 'Passwords do not match',
    },
  });
  type FormValues = typeof form.values;

  function makeOnClick(_action: Action) {
    return function () {
      if (action !== _action) setAction(_action);
    };
  }

  async function handleFormSubmit(values: FormValues) {
    let err;
    switch (action) {
      case Action.login:
        err = await login(values);
        break;
      case Action.signUp:
        err = await signup({ username: values.identity, password: values.password });
        break;
    }
    if (err) setError(err.message);
    else router.push('/homepage');
  }

  const newUser = action === Action.signUp;

  return (
    <AppShell
      header={
        <Header height="70">
          <ColorSchemeToggle />
        </Header>
      }
    >
      <Center>
        <Card>
          <InputWrapper error={error}>
            <form onSubmit={form.onSubmit(handleFormSubmit)}>
              <TextInput
                label="Username"
                autoComplete="username"
                {...form.getInputProps('identity')}
              />
              <TextInput
                label="Password"
                type="password"
                autoComplete="password"
                {...form.getInputProps('password')}
              />
              {newUser && (
                <>
                  <TextInput
                    label="Confirm password"
                    type="password"
                    {...form.getInputProps('confirmPassword')}
                  />
                  <TextInput
                    label="Email"
                    type="email"
                    autoComplete="email"
                    {...form.getInputProps('email')}
                  />
                </>
              )}
              <Stack sx={{ paddingTop: 12 }}>
                <Button type={newUser ? undefined : 'submit'} onClick={makeOnClick(Action.login)}>
                  Login
                </Button>
                <Button type={newUser ? 'submit' : undefined} onClick={makeOnClick(Action.signUp)}>
                  Sign up
                </Button>
              </Stack>
            </form>
          </InputWrapper>
        </Card>
      </Center>
    </AppShell>
  );
}
