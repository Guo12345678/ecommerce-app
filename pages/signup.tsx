import { AppShell, Center, TextInput, Group, Button } from '@mantine/core'

export default function SignUp() {
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
        label="Password"
        required />
      {/* actual button to confirm sign-in */}
      <Button>Sign Up</Button>
      </Center>
    </AppShell>
  )
}