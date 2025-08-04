import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState<string | null>(null)

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      if (
        values.email === 'admin@starberry.com' &&
        values.password === 'password123'
      ) {
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', values.email)
        navigate('/list')
      } else {
        setLoginError('Invalid email or password')
      }
    },
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {loginError && (
          <div className="mb-4 text-sm text-red-600 text-center">{loginError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full px-3 py-2 border rounded ${
                touched.email && errors.email
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`w-full px-3 py-2 border rounded ${
                touched.password && errors.password
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
