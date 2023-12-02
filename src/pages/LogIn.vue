<template>
      <!-- <NavBar/> -->
      <!-- <NavBar/> -->
      <body>
    <section>
        <form>
            <h1>Login</h1>
            <div class="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input type="email" required>
                <label for="">Email</label>
            </div>
            <div class="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input type="password" required>
                <label for="">Password</label>
            </div>
            <button>Log in</button>
            <div class="register">
                <p>Don't have a account <a href="#">Register</a></p>
                <!-- <p class="more">หมายเหตุ : หากลืมรหัสผ่านโปรดติดต่อผู้ดูแลระบบ</p> -->
            </div>
        </form>
    </section>
</body>
  </template>
  
  <script>
// import NavBar from "@/components/NavBar.vue";
  export default {
    name: "LogIn",
    components: {
    // NavBar,
  },
  };
  </script>

  <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'poppins',sans-serif;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1F1F1F;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

section {
    position: relative;
    max-width: 400px;
    background-color: rgb(246, 246, 246);
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(55px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 3rem;
}

h1 {
    font-size: 2rem;
    color: #000000;
    text-align: center;
}

.inputbox {
    position: relative;
    margin: 30px 0;
    max-width: 310px;
    border-bottom: 2px solid #707070;
}

.inputbox label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    color: #707070;
    font-size: 1rem;
    pointer-events: none;
    transition: all 0.5s ease-in-out;
}

input:focus ~ label, 
input:valid ~ label {
    top: -5px;
}

.inputbox input {
    width: 100%;
    height: 40px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 0 35px 0 5px;
    color: #707070;
}

.inputbox ion-icon {
    position: absolute;
    right: 8px;
    color: #fff;
    font-size: 1.2rem;
    top: 20px;
}


button {
    width: 100%;
    height: 45px;
    border-radius: 40px;
    background-color: #EE5684;
    border: none;
    outline: none;
    cursor: pointer;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.4s ease;
}

button:hover {
  background-color: #ae3458;
}

.register {
    font-size: 0.9rem;
    color: #707070;
    text-align: center;
    margin: 10px 0 10px;
}

.register p a {
    text-decoration: none;
    color: #EE5684;
    font-weight: 600;
    text-align: center;
}

.register p a:hover {
    text-decoration: underline;
}

/* .register .more {
    text-decoration: none;
    color: #EE5684;
    font-weight: 600;
    text-align: center;
} */

</style>
  