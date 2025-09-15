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
      router.push('/');
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

