// src/composables/useAuth.js

import { ref, onMounted } from 'vue';
import supabase from '../supabase';
import { useRouter } from 'vue-router';

export const useAuth = () => {
  const isLogin = ref(false);
  const user = ref(null);
  const router = useRouter();

  const updateUserState= async () => {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    if (currentUser) {
      isLogin.value = true;
      user.value = currentUser;
    } else {
      isLogin.value = false;
      user.value = null;
      router.push('/login');
    }
  };

  onMounted(() => {
    updateUserState();
  });

  return {
    isLogin,
    user,
    updateUserState,
  };
};



// //check log in status upon mounting
// onMounted(async () => {
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   console.log(user?.email);

//   if (user) {
//     console.log(" you are login now");
//     isLogin.value = true;

//     const { data: userData, error: userError } = await supabase
//       .from("user_table")
//       .select()
//       .eq("id", user.id);

//     if (userData && !userError) {
//       console.log("user data:", userData);

//       name.value = userData[0].name;
//       tel.value = userData[0].tel;
//       location.value = userData[0].location;
//       text.value = userData[0].text;
//     }
//   } else {
//     console.log("you are log out");
//     isLogin.value = false;
//     alert("Please log in");
//     router.push("/");
//   }
// });