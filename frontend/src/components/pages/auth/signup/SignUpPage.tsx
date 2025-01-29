import axios from 'axios';
import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormSchema } from '../../../../models/FormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { apiUrl } from '../login/LoginPage';

type FormData = z.infer<typeof FormSchema>;

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');

  const authUser = async (data: FormData) => {
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        apiUrl,
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setSuccess('Created new user!');
      console.log(response.data);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(error.message || 'Cannot create user');
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    await authUser(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name')} type="text" placeholder="Enter your name" />
              <p className="text-sm text-red-500">{errors.name?.message}</p>
            </div>

           
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register('email')} type="email" placeholder="Enter your email" />
              <p className="text-sm text-red-500">{errors.email?.message}</p>
            </div>

      
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...register('username')} type="text" placeholder="Enter your username" />
              <p className="text-sm text-red-500">{errors.username?.message}</p>
            </div>

         
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                {...register('password')}
                type="password"
                placeholder="Enter your password"
              />
              <p className="text-sm text-red-500">{errors.password?.message}</p>
            </div>

           
            <Button type="submit" className="w-full">
              {loading ? 'Loading...' : 'Submit'}
            </Button>

          
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
           
            {success && <p className="mt-2 text-sm text-green-500">{success}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
