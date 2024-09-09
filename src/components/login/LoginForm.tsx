import { Formik } from "formik";
import { validation } from "./validationUtils";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { AUTH_SIGNIN_ENDPOINT } from "../../config/endpoints";
import { NavigateFunction, useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        initialTouched={{ username: false, password: false }}
        onSubmit={(values, actions) => {
          // console.log(values)
          const body = {
            login: values.username,
            password: values.password
          }
          axios.post(process.env.REACT_APP_BASE_API_URL + AUTH_SIGNIN_ENDPOINT, body, {
            headers: {
              //'Authorization': "",
            }
          })
            .then((resp) => {
              window.localStorage.setItem("token", resp.data.accessToken);
              navigate("/products")
            })
            .catch((error) => {
              if (error.response.status === 403) {
                actions.setStatus({ error: "Usuario o contraseña incorrectos" });
              } else {
                actions.setStatus({ error: "Error" });
              }
            })
            .finally(() => {
              actions.setSubmitting(false);
            })
        }}
        validate={validation}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="username"
              value={props.values.username}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.touched.username && Boolean(props.errors.username)}
              helperText={props.touched.username && props.errors.username}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={props.values.password}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={props.touched.password && Boolean(props.errors.password)}
              helperText={props.touched.password && props.errors.password}
            />
            {props.status && props.status.error && (
              <div style={{ color: 'red' }}>{props.status.error}</div>
            )}
            <Button disabled={!props.isValid || !props.dirty || props.isSubmitting}
              color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        )
        }
      </Formik >
    </>
  )
}