// Imported
import React, { useState } from 'react';
import { ActiveUserComponent, DPScrollView } from '@dailypay/component-library';
import { SignupUserV2 } from '@dailypay/paytm-onboarding-api-client/dist/Models/SignupUser';
import { Alert, View } from 'react-native';
// Local
import { isIOS } from 'services/device-info';
import { makeStyles } from 'services/styles';
import { ApiClient } from 'services/api';
import { router } from 'expo-router';
import CreateLogin from 'components/enrolling/CreateLogin';

const CreateLoginPage = () => {
  // State
  const [localSignupUser, setLocalSignupUser] = useState<SignupUserV2 | null>(
    null
  );
  const [apiError, setApiError] = useState('');
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');
  const [showPinEnrollment, setShowPinEnrollment] = useState(false);
  const [showLocalAuthEnrollment, setShowLocalAuthEnrollment] = useState(false);
  const [showActiveModal, setShowActiveModal] = useState(false);

  // Styles
  const styles = useStyles();

  // Misc
  //   const { enrollmentErrorHelper } = useOnboardingErrorHandle();

  // Navigation

  // Translations

  const translations = {
    header: 'Header',
    emailInputLabel: 'Email',
    passwordInputLabel: 'Password',
    lowerCaseValidation: 'one lower case',
    upperCaseValidation: 'one upper case!',
    lengthValidation: 'at least 8 characters',
    symbolValidation: 'One symbol ($#^@)',
    privacyPolicyTitle: 'Privacy POlicy',
    termsLink: 'Terms',
    and: 'and',
    privacyPolicyLink: 'Privacy policy',
    cta: 'Sign Up',
    loginLink: 'Go Login',
  };

  const modalTranslations = {
    activeUserModalHeader: 'modalHeader',
    activeUserModalContent: 'modalContent',
    activeUserPrimaryCta: 'cta',
    activeUserSecondaryCta: 'secondary cta',
  };

  // Functionality
  // Create Account With Email + Password
  const handleCreateAccount = async () => {
    const updatedSignupUser = await ApiClient.createEmail(formValues);
    return updatedSignupUser;
  };

  // Create Account With Google
  //   const signInWithGoogle = async () => {
  //     try {
  //       await GoogleSignin.hasPlayServices();
  //       const userInfo = await GoogleSignin.signIn();
  //       return userInfo;
  //     } catch (error) {
  //       return error;
  //     }
  //   };

  //   const handleGoogle = async () => {
  //     // On Android the signed in user gets cached and you can't use a different one (no picker unless you call this method)
  //     if (!isIOS) await GoogleSignin.signOut();
  //     const googleSignInData = await signInWithGoogle();
  //     const updatedSignupUser = await ApiClient.createEmail({
  //       platform: isIOS ? 'ios' : 'android',
  //       google_token: googleSignInData.idToken,
  //     });
  //     return updatedSignupUser;
  //   };

  const handleCTAPress = async ({
    loginType,
  }: {
    loginType: 'password' | 'google';
  }) => {
    const loadingSetter =
      loginType === 'google' ? setGoogleLoading : setLoading;
    const errorSetter = loginType === 'google' ? setGoogleError : setApiError;
    loadingSetter(true);

    try {
      const updatedSignupUser = await handleCreateAccount();
      setLocalSignupUser(updatedSignupUser);

      loadingSetter(false);

      if (updatedSignupUser.user?.activated) {
        console.log('activated !');
      }

      return onEnrollmentCompleteCallback();
    } catch (err) {
      loadingSetter(false);
      const errCode = err?.response?.data?.error?.code;
      setLoading(false);
      errorSetter('Errrrr');
    }
  };

  const onEnrollmentCompleteCallback = () => {
    Alert.alert('Successfully signed up!');
  };

  const handleLoginClick = () => {
    router.push('/dailypay/');
  };

  const handleTryAgainClick = () => {
    setShowActiveModal(false);
  };

  const handleTermsClick = () => {
    //
  };

  const handlePrivacyPolicyClick = () => {
    return null;
  };

  const resetErrors = () => {
    if (formErrors) setFormErrors({ email: '', password: '' });
    if (apiError) setApiError('');
    if (googleError) setGoogleError('');
  };

  if (false) return null;

  return (
    <DPScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>
        <CreateLogin
          apiError={apiError}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          formValues={formValues}
          setFormValues={setFormValues}
          handleCTAPress={() => handleCTAPress({ loginType: 'password' })}
          handleLoginClick={handleLoginClick}
          handlePrivacyPolicyClick={handlePrivacyPolicyClick}
          handleTermsClick={handleTermsClick}
          loading={loading}
          translations={translations}
          validationError={'Invalid Email'}
          resetErrors={resetErrors}
        >
          {/* <OAuthLogin
            isFirst
            handleOAuth={() => handleCTAPress({ loginType: 'google' })}
            OAuthError={googleError}
            translations={googleOAuthTranslations}
            OAuthIcon={<Icon type={IconTypes.GOOGLE} width={24} height={24} />}
          /> */}
        </CreateLogin>
      </View>
      <ActiveUserComponent
        handleLoginClick={handleLoginClick}
        handleTryAgain={handleTryAgainClick}
        modal={true}
        setShowActiveUserModal={setShowActiveModal}
        showActiveUserModal={showActiveModal}
        translations={modalTranslations}
      />
    </DPScrollView>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    paddingHorizontal: 24,
  },
}));

export default CreateLoginPage;
