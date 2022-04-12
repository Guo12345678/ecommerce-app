import { AppShell, Center, TextInput, Group, Button, Stack } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { useState, useRef } from 'react'

async function handleLogin(body) {
  const res = await fetch('/api/login', { 
    method: 'POST',
    body
  })
  alert(await res.text())
}

async function handleSignup(body) {
  if (body.password !== body.confirmPassword) {
    alert("Wrong Password")
      
  }
}

export default function Login() {
  const [newUser, setNewUser] = useState(false)
  const formRef = useRef()
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => ({
      confirmPassword: !newUser || values.password === values.confirmPassword
        ? null
        : 'Passwords do not match.'
    })
  })
  
  return (  
    <AppShell>
      <Center>
        <form ref={formRef} onSubmit={form.onSubmit(
            newUser ? handleSignup : handleLogin)}>
          <TextInput
            placeholder="Username"
            label="Username"
            required
            {...form.getInputProps('username')} />
          <TextInput
            placeholder="Password"
            label="Password"
            type="password"
            required
            {...form.getInputProps('password')} />
          {newUser && (
            <TextInput
              label="Confirm password"
              type="password"
              required
              {...form.getInputProps('confirmPassword')} />
          )}
          <Stack sx={{ padding: '12px 0 0 0' }}>
            <Button onClick={() => newUser 
              ? setNewUser(false) : formRef.submit()}>Login</Button>
            <Button onClick={() => !newUser
                ? setNewUser(true) : formRef.submit()}>Sign up</Button>
          </Stack>
        </form>
      </Center>
    </AppShell>
  )
}

function SignUp() {
  return (
    <AppShell>
      <Center>
      {/* text field: username */}
       <TextInput
        placeholder="Username"
        label="Username"
        required />
      {/* text field: password */}
       <TextInput
        placeholder="Password"
        label="Password"
        required />
      {/* text field: confirm password */}
      <TextInput
        placeholder="ConfirmPassword"
        label="ConfirmPassword"
        required />
      {/* actual button to confirm sign-in */}
      <Button>Sign Up</Button>
      </Center>
    </AppShell>
  )

}