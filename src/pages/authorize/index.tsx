// ** React Imports
import { FormEvent, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// ** MUI Components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';
import { FormHelperText } from '@mui/material';

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}));

const Authorize = () => {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState<SetStateAction<string | null>>(null);
  const searchParams = useSearchParams();
  const keyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (response?.message) setError(response.message as string);
  }, [response]);

  const handleName = (e: any) => {
    if (keyRef?.current) keyRef.current.value = e.target.value;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = searchParams.get('code');

    if (!keyRef?.current?.value) return;
    setResponse(null);
    setError(null);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK}/admin/code`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        code,
        password: keyRef.current?.value.toUpperCase()
      })
    });

    res.ok ? setResponse(true) : setResponse(await res.json());
  };

  return (
    <Box className='content-center'>
      <Box
        sx={{
          p: 7,
          width: '28rem',
          height: '12rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.paper'
        }}
      >
        <BoxWrapper>
          <Box
            sx={{
              top: 30,
              left: 40,
              display: 'flex',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => onSubmit(e)}>
            <TextField
              ref={keyRef}
              onChange={(e) => handleName(e)}
              autoFocus
              fullWidth
              sx={{ mb: !error ? 4 : 0 }}
              label='Ingrese su clave'
              placeholder='Clave'
            />
            {error && (
              <FormHelperText sx={{ color: 'error.main', mb: 2 }} id='validation-basic-textarea'>
                {error as string}
              </FormHelperText>
            )}
            {!error && response && (
              <FormHelperText sx={{ color: 'success.main', mb: 2 }} id='validation-basic-textarea'>
                Todo listo. ¡Muchas gracias!
              </FormHelperText>
            )}
            <Button disabled={!error && response} fullWidth size='large' type='submit' variant='contained' >
              Autorizar
            </Button>
          </form>
        </BoxWrapper>
      </Box>
    </Box>
  );
};

Authorize.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

Authorize.guestGuard = true;

export default Authorize;
