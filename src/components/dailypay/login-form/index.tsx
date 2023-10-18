import {
  CloseButton,
  DPButton,
  DPSwitch,
  DPText,
  DPTextInput,
  Icon,
  useDPFormContext,
} from '@dailypay/component-library';
import { Pressable, TextInput, View } from 'react-native';
import { makeStyles } from 'services/styles';
import { AuthenticationType } from 'expo-local-authentication';
import { LoginFormValuesType } from 'src/app/dailypay';
import { useRef, useState } from 'react';
// import DPInput from '@dailypay/component-library/lib/typescript/src/components/core/DPTextInput/DPTextInput';

type TextChangeEvent = (e: string) => void;

export interface IdentityProviderError {
  code: string;
  message: string;
}

export interface LoginFormProps {
  showPassword: boolean;
  identityError: IdentityProviderError | null;
  localAuthType?: AuthenticationType;
  localAuthLogin(): Promise<void>;
  loading: boolean;
  savedUsername: string;
  shouldSaveEmail: boolean;
  setShowPassword: (shouldShowPassword: boolean) => void;
  setIdentityError: (error: null) => void;
  pinLogin(): void;
  emailFromDeepLink?: string;
  onFindAccountPress?: () => void;
  doneLoadingSavedData: boolean;
}

const LoginForm = (props: LoginFormProps) => {
  const [showPasswordText, setShowPasswordText] = useState<boolean>(false);
  const styles = useStyles();
  const emailInputRef = useRef<TextInput>(null);
  const {
    values,
    touched,
    errors,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useDPFormContext<LoginFormValuesType>();
  const {
    showPassword,
    setShowPassword,
    localAuthType,
    localAuthLogin,
    identityError,
    setIdentityError,
    pinLogin,
    loading,
  } = props;

  const handleClose = () => {
    /* TODO: Maybe remove this whenever we provide a list of providers, we likely won't require
    this workaround, which is primarily designed to prevent SSO users from getting to a broken
    state where they can't enter their password */
    setShowPassword(false);
    setValues({
      email: '',
      password: '',
    });
    setIdentityError(null);
    emailInputRef?.current?.focus();
  };

  return (
    <View style={styles.form}>
      <View style={styles.emailView}>
        <DPTextInput
          ref={emailInputRef}
          label={'Email'}
          value={values.email}
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          errorMessage={touched.email ? errors.email : ''}
          isValid={touched.email && !errors.email}
          textContentType='username'
          autoComplete='username'
          accessibilityLabel={'login-email-input'}
          iconSpace={60}
          style={styles.emailInput}
        />
        <View style={styles.baseEmailButton}>
          {!!values.email?.length && (
            <CloseButton
              onPress={handleClose}
              style={localAuthType && styles.closeButtonWithAuth}
              //   fill={theme.Primary.main}
            />
          )}
          {/* {localAuthIconProps.type && <LocalAuthIcon {...localAuthIconProps} />} */}
        </View>
        {!!showPassword && (
          <DPTextInput
            secureTextEntry={!showPasswordText}
            label={'Password'}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            isValid={values.password.length > 0}
            textContentType='password'
            autoComplete='password'
            returnKeyType='done'
            accessibilityLabel={'loginPassword'}
            icon={
              <Pressable
                onPress={() => {
                  setShowPasswordText(!showPasswordText);
                }}
                style={styles.showPasswordIconStyles}
              >
                <Icon
                  type={showPasswordText ? 'eyeIconClosed' : 'eyeIconOpen'}
                  width={24}
                  height={24}
                  fill={'blue'}
                />
              </Pressable>
            }
          />
        )}
        {/* <View style={styles.saveEmail}>
          <DPSwitch
            accessibilityLabel={'Save Email'}
            onValueChange={(value) => setFieldValue('saveEmail', value)}
            value={values.saveEmail}
          />
          <DPText style={styles.saveEmailText}>{t('login.saveEmail')}</DPText>
        </View> */}
        {/* {identityError && (
            <View style={styles.errorContainer} testID={LoginIDs.LOGIN_ERROR}>
              <DPError centered errorMessage={t(identityError.message)} />
              {identityError.code === 'UNACTIVATED_USER' && (
                <InAppLink onPress={props.onFindAccountPress}>
                  {' ' + t('login.signUp')}
                </InAppLink>
              )}
            </View>
          )} */}
        <DPButton
          loading={loading}
          title={showPassword ? 'Login' : 'Continue'}
          onPress={() => handleSubmit()}
          disabled={!isValid || loading}
          style={!identityError && styles.button}
        />
        {/* {isGoogleSigninEnabled && (
            <GoogleLogin
              handleGoogleAuth={handleGoogle}
              googleError={googleError}
              loading={googleLoading}
              translations={{
                continueWithGoogle: t('oauth.google.continue'),
                or: t('oauth.or'),
              }}
            />
          )} */}
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  form: {
    marginVertical: 24,
  },
  errorContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    marginTop: 32,
  },
  emailView: {
    position: 'relative',
  },
  emailInput: { lineHeight: 17 },
  saveEmail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveEmailText: {
    color: theme.Text.secondary,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 8,
  },
  baseEmailButton: {
    position: 'absolute',
    top: 22, // Point where the view aligns with the top of the text box
    height: 32, // text input height minus the border
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 100,
  },
  closeButtonWithAuth: {
    marginRight: 8,
  },
  showPasswordIconStyles: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 0,
    zIndex: 100,
  },
}));

export default LoginForm;
