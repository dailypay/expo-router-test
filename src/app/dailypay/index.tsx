import { DPForm, DPScrollView, DPText } from '@dailypay/component-library';
import { authenticate } from '@dailypay/paytm-apollo-client';
import DPFormHeader from 'components/common/dp-form-header';
import DPHeaderDescriptionText from 'components/common/dp-header-description-text';
import DPKeyboardAvoidingView from 'components/common/dp-keyboard-avoiding-view';
import DPLogoHeader from 'components/common/dp-logo-header';
import LoginForm, {
  IdentityProviderError,
} from 'components/dailypay/login-form';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ApiClient } from 'services/api';
import { makeStyles } from 'services/styles';
import { tokenStorage } from 'services/token-storage';
import * as Yup from 'yup';

export interface LoginFormValuesType {
  email: string;
  password: string;
}

export default function Login() {
  const styles = useStyles();

  const initialFormValues: LoginFormValuesType = {
    email: '',
    password: '',
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<IdentityProviderError | null>({
    code: '',
    message: '',
  });

  const onSubmit = async (values: LoginFormValuesType) => {
    try {
      if (!showPassword) {
        const res = await ApiClient.findIdentityProviderByEmail({
          email: values.email,
        });
        // if (res.sso_target_url) {
        //   return Alert.alert('You are SSO!');
        // }
        setShowPassword(true);
      } else {
        const response = await authenticate({
          endpoint: 'http://employees-api.localhost.com:3000/oauth/token',
          storage: tokenStorage,
          body: {
            grant_type: 'password',
            username: values.email,
            password: values.password,
          },
        });
        router.push('/dailypay/apollo-provider/');
      }
    } catch (err) {
      console.log(err, 'here');
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('I need an email'),
    // @ts-ignore
    password: showPassword
      ? Yup.string().required('I need a string!')
      : undefined,
    saveEmail: Yup.boolean(),
  });

  const goToResetPassword = () => {
    router.back();
  };

  const onFindAccountPress = () => {
    router.push('/dailypay/enrolling');
  };

  const localAuthLogin = async () => {
    //
  };

  const pinLogin = () => {
    //
  };

  return (
    <DPKeyboardAvoidingView style={styles.mainContainer}>
      <DPScrollView contentContainerStyle={styles.container}>
        <DPLogoHeader style={styles.logo as ImageStyle} />
        {/* TODO: T t('login.title') */}
        <DPFormHeader text={'Login'} />

        {/* TODO: T t('login.enterInfo') */}
        <DPHeaderDescriptionText>{'Enter your info'}</DPHeaderDescriptionText>
        <DPForm<LoginFormValuesType>
          initialValues={initialFormValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnBlur
        >
          {() => (
            <LoginForm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              identityError={error}
              setIdentityError={setError}
              localAuthType={3}
              // pinLogin={props.pinLogin}
              onFindAccountPress={onFindAccountPress}
              // localAuthLogin={props.localAuthLogin}
              loading={loading}
              savedUsername={''}
              localAuthLogin={localAuthLogin}
              pinLogin={pinLogin}
              shouldSaveEmail={false}
              // shouldSaveEmail={props.shouldSaveEmail}
              // emailFromDeepLink={props.emailFromDeepLink}
              doneLoadingSavedData={true}
            />
          )}
        </DPForm>
        <View style={styles.linksContainer}>
          <TouchableOpacity
            onPress={goToResetPassword}
            style={styles.helperTextContainer}
          >
            <DPText style={styles.helperText} fontWeight='600'>
              {/* TODO: T t('login.forgotPassword') */}
              Forgot Password
            </DPText>
            <DPText accessible={false}> </DPText>
            <DPText style={styles.link} fontWeight='600'>
              {/* TODO: T t('login.resetIt') */}
              Reset Password
            </DPText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onFindAccountPress}
            style={styles.helperTextContainer}
          >
            <DPText style={styles.helperText} fontWeight='600'>
              {/* {t('login.dontHaveAccount')} */}
              Don't have an account?
            </DPText>
            <DPText accessible={false}> </DPText>
            <DPText style={styles.link} fontWeight='600'>
              {/* {t('login.getStarted')} */}
              Get Started
            </DPText>
          </TouchableOpacity>
        </View>
        {/* <BuildInfo>
          {isExpo && <DevelopmentToolsLink />}
          {ANALYTICS_LOGGING_ENABLED && <AnalyticsLogLink />}
        </BuildInfo> */}
      </DPScrollView>
    </DPKeyboardAvoidingView>
  );
}

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 96,
  },
  container: {
    paddingHorizontal: 32,
    minHeight: '100%',
    paddingBottom: 16,
  },
  linksContainer: {
    marginHorizontal: -32,
  },
  helperTextContainer: {
    textAlign: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    fontSize: 14,
    lineHeight: 16,
  },
  helperText: {
    color: theme.Text.secondary,
  },
  link: {
    color: theme.Link,
  },
  logo: {
    marginBottom: 24,
  },
  poweredBy: {
    marginLeft: 8,
  },
}));
