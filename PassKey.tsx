// this file in the react js component with the typescript

import { useState } from "react";

const PassKey = () => {
    const [rawId, setRawId] = useState<null | string>();
  async function registerPassKey() {
    try {
      const options = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array([0, 1, 2, 3, 4, 5, 6]),
          rp: {
            name: "PassKey Feature",
          },
          user: {
            id: new Uint8Array(16),
            name: "amit@gmail.com", // username should be unique
            displayName: "Amit Patel",
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 },
            { type: "public-key", alg: -8 },
            { type: "public-key", alg: -257 },
          ],
        },
      });
      console.log("Options : ", options);
    //   @ts-ignore
      setRawId(options?.rawId)
    } catch (error) {}
  }

  async function loginByPassKey() {
    try {
        const respone = await navigator.credentials.get({
            publicKey:{
                challenge: new Uint8Array([0, 1, 2, 3, 4, 5, 6]),
                // @ts-ignore
                allowCredentials: [{ type: "public-key", id: rawId }],
            }
        })
        console.log("Result ", respone)
        
    } catch (error) {}
  }
  return (
    <div>
      <button onClick={registerPassKey}>Register a New PassKey</button>
      <button onClick={loginByPassKey}>Login By a PassKey</button>
    </div>
  );
};

export default PassKey;
