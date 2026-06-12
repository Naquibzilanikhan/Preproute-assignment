import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { loginSchema } from '../../schemas/login.schema.js';
import { useAuth } from '../../hooks/useAuth.js';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import illustration from '../../assets/illustrations/login.svg';
import styles from './Login.module.css';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { userId: '', password: '' },
  });

  if (isAuthenticated) return <Navigate to="/test-creation" replace />;

  async function onSubmit(values) {
    setSubmitError(null);
    try {
      await login(values);
      navigate('/test-creation', { replace: true });
    } catch (err) {
      setSubmitError(err.message || 'Login failed');
    }
  }

  return (
    <main className={styles.page}>
      <aside className={styles.left} aria-hidden="true">
        <img src={illustration} alt="" className={styles.illo} />
      </aside>
      <section className={styles.right}>
        <div className={styles.card}>
          <div className={styles.brand}>PrepRoute</div>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>Use your company provided Login credentials</p>
          <form noValidate onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
              label="User ID"
              placeholder="Enter User ID"
              autoComplete="username"
              error={errors.userId?.message}
              {...register('userId')}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter Password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />
            <a
              href="#"
              className={styles.forgot}
              onClick={(e) => e.preventDefault()}
            >
              Forgot password?
            </a>
            {submitError && <div role="alert" className={styles.serverError}>{submitError}</div>}
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Login'}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
