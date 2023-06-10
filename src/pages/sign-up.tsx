import Signup from '@/features/authentication/components/Signup';
import { IndexLayout } from '@/features/layout/IndexLayout';

type Props = {};
function SignupPage({}: Props) {
  return (
    <>
      <Signup />
    </>
  );
}
SignupPage.PageLayout = IndexLayout;
export default SignupPage;
