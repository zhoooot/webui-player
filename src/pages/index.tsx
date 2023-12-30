// gọi authenticate của XuTu => trả về token => lưu vào localStorage
// token chứa role của thằng đấy luôn
// role => nếu đúng role => mới truy cập đc
// ko thì redirect về trang ...

import router from "next/router";
import { useState } from "react";

// call authentication service, return token and save into local storage
// token contains role of user
// role => if true => access
// else => redirect to ...
// code it for me
// 1. call api
// 2. save token to local storage
// 3. get token from local storage
// 4. check role
// 5. redirect to ...
// 6. access
// 7. logout
// 8. clear local storage
// 9. redirect to login

const App = () => {
  const goToJoin = () => {
    router.push("/join/pinInput");
  };

  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <button onClick={() => goToJoin()}>Join Player</button>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button
        onClick={() =>
          router.push({ pathname: "/lobby", query: { pin: inputValue } })
          //router.push({ pathname: "/join/nameInput" })
        }
      >
        Join Host
      </button>
    </div>
  );
};

export default App;
