'use client';

import {signUp} from '@/app/actions';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {FormDataSchema} from '@/lib/schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRef} from 'react';
import {useFormState} from 'react-dom';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

export default function SignUpForm() {
  const form = useForm<z.infer<typeof FormDataSchema>>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [state, formAction] = useFormState(signUp, {
    message: '',
  });
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="w-80">
      <Form {...form}>
        <form
          ref={formRef}
          action={formAction}
          onSubmit={(evt) => {
            evt.preventDefault();
            form.handleSubmit(() => {
              formAction(new FormData(formRef.current!));
            })(evt);
          }}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-10" type="submit">
            Submit
          </Button>
        </form>
        {state?.message !== '' && !state.issues && (
          <div className="text-green-500 text-small">{state.message}</div>
        )}
        {state?.issues && (
          <div className="text-red-500 text-small">
            <ul>
              {state.issues.map((issue) => (
                <li key={issue} className="flex gap-1">
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Form>
    </div>
  );
}
