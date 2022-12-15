import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdCheckmarkCircle } from "react-icons/io";
import styled from "styled-components";
import { showErrMsg, showSuccessMsg } from "../utils/notification/Notification";

const Activation = () => {
  const { id: token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (token) {
      const GetToken = async () => {
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/user/activateEmail",
            { activationTokens: token }
          );
          setSuccess(data.message);
        } catch (error: any) {
          error.response.data && setErr(error.response.data.message);
        }
      };
      GetToken();
    }
  }, [token]);

  console.log(token);

  return (
    <Continer>
      {success && (
        <ConorWrapper>
          <Head>
            <h1> LOGO. </h1>
            <span> Account Activation </span>
          </Head>
          <BodyStyle>
            <IoMdCheckmarkCircle size={75} color="green" />
            <p> Success! Your account has been activated. </p>
            <p> Please login to your profile </p>
            <Link to="/login"> Sign in </Link>
          </BodyStyle>
        </ConorWrapper>
      )}
      {err && (
        <ConorWrapper>
          <Head>
            <h1> LOGO. </h1>
            <span> Account Activation </span>
          </Head>
          <BodyStyle>
            <IoMdCheckmarkCircle size={75} color="red" />
            <p> {err} </p>
            <Link to="/login"> Login </Link>
          </BodyStyle>
        </ConorWrapper>
      )}
    </Continer>
  );
};

export default Activation;

const Continer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100vh;
`;

const ConorWrapper = styled.div`
  background: var(--primary);
  border-radius: 1rem;
  box-shadow: -3px -3px 9px #70a3ff, 3px 3px 7px #f61dff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
`;

const BodyStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 40%;
`;
