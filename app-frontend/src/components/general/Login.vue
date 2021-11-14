<template>
  <div class="bg-gray-white">
    <div class="h-screen flex justify-center items-center">
      <div class="bg-white rounded-lg px-16 py-16 w-full md:w-3/5 lg:w-2/5">
        <form>
          <div class="flex font-bold justify-center">

          </div>
          <h2 class="text-3xl text-center font-light text-gray-700 mb-4">
            <i class="fas fa-calculator text-blue-400 mx-2"></i>
            <span class="font-bold">arith</span>metix.
          </h2>
          <div
            class="
              input-div
              border-b-2
              relative
              grid
              my-5
              py-1
              focus:outline-none
            "
            style="grid-template-columns: 7% 93%"
          >
            <div class="i">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="div">
              <h5>email</h5>
              <input
                type="text"
                class="
                  absolute
                  w-full
                  h-full
                  py-2
                  px-3
                  outline-none
                  inset-0
                  text-gray-700
                "
                style="background: none"
              />
            </div>
          </div>
          <div
            class="
              input-div
              border-b-2
              relative
              grid
              my-5
              py-1
              focus:outline-none
            "
            style="grid-template-columns: 7% 93%"
          >
            <div class="i">
              <i class="fas fa-lock"></i>
            </div>
            <div class="div">
              <h5>password</h5>
              <input
                type="password"
                class="
                  absolute
                  w-full
                  h-full
                  py-2
                  px-3
                  outline-none
                  inset-0
                  text-gray-700
                "
                style="background: none"
              />
            </div>
          </div>
          <a
            href="#"
            class="text-xs text-blue-400 hover:text-blue-400 float-right mb-4"
            >Forgot Password?</a
          >
          <button
            type="submit"
            class="
              w-full
              py-2
              rounded-full
              bg-green-600
              text-gray-100
              focus:outline-none
            "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.i {
  color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.i i {
  transition: 0.3s;
}

.input-div > div {
  position: relative;
  height: 45px;
}

.input-div > div > h5 {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
  transition: 0.3s;
}

.input-div:before,
.input-div:after {
  content: '';
  position: absolute;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: #60a5fa;
  transition: 0.4s;
}

.input-div:before {
  right: 50%;
}

.input-div:after {
  left: 50%;
}

.input-div.focus:before,
.input-div.focus:after {
  width: 50%;
}

.input-div.focus > div > h5 {
  top: -5px;
  font-size: 15px;
}

.input-div.focus > .i > i {
  color: #60a5fa;
}
</style>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMsg: '',
    };
  },
  mounted() {
    const inputs = document.querySelectorAll("input");

    function addC() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }

    function removeC() {
      let parent = this.parentNode.parentNode;
      if (this.value == "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", addC);
      input.addEventListener("blur", removeC);
    });
  },
  methods: {
    /**
     * Authenticates the user.
     * Username and password are sent to server, checked,
     * and returns webtokens if valid.
     * User is then sent to the appropriate page.
     *
     * @param {click} e - On-click event handler.
     * @arg {response} r - A response argument from server.
     */
    handleSubmit(e) {
      e.preventDefault();

      if (this.password.length > 0 && this.email.length > 0) {
        fetch(
          `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: `{"email":"${this.email}","password":"${this.password}"}`,
          },
        )
          .then((r) => {
            return r.json();
          })
          .then((r) => {
            console.log(r);
            /* Set user details in local storage - if needed elsewhere */
            localStorage.setItem('user', r.user);
            localStorage.setItem('jwt', r.token);
            localStorage.setItem('student', r.student);
            localStorage.setItem('teacher', r.teacher);

            /* If user has a webtoken, send them to the correct page. */
            if (localStorage.getItem('jwt') != null) {
              this.$router.push(['student', 'teacher'].find((e) => r[e]));
            }
          })
          .catch((error) => {
            this.errorMsg = 'Incorrect Username and/or Password!';
            console.error(error);
          });
      } else {
        this.errorMsg = 'Please enter Username and Password!';
      }
    },
  },
};
</script>
