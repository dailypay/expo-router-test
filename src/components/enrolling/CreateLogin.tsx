// Imported
import {
  DPButton,
  DPError,
  DPText,
  Icon,
  IconTypes,
  DPTextInput,
} from '@dailypay/component-library';

import React, { ReactNode, useState } from 'react';
import { DimensionValue, Platform, Pressable, View } from 'react-native';
import { makeStyles } from 'services/styles';
import { handleValidations } from 'services/validations';

export type CreateLoginTranslations = {
  header: string;
  emailInputLabel: string;
  passwordInputLabel: string;
  lowerCaseValidation: string;
  upperCaseValidation: string;
  symbolValidation: string;
  lengthValidation: string;
  privacyPolicyTitle: string;
  termsLink: string;
  and: string;
  privacyPolicyLink: string;
  loginLink: string;
  cta: string;
};

export type CreateLoginProps = {
  translations: CreateLoginTranslations;
  formErrors: FormTypes;
  validationError: string;
  setFormErrors: React.Dispatch<React.SetStateAction<FormTypes>>;
  handleCTAPress: () => Promise<void>;
  loading: boolean;
  handlePrivacyPolicyClick: () => void;
  handleTermsClick: () => void;
  handleLoginClick: () => void;
  setFormValues: React.Dispatch<React.SetStateAction<FormTypes>>;
  formValues: FormTypes;
  apiError: string;
  resetErrors: () => void;
  onboardingFlowAlternateStyling?: boolean;
  //   t?: TFunction;
  children: ReactNode;
};

type FormTypes = {
  email: string;
  password: string;
};

type BlurTypes = {
  email: boolean;
  password: boolean;
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = re.test(String(email).toLowerCase());
  return isValid;
};

export default function CreateLogin({
  translations,
  handleCTAPress,
  handlePrivacyPolicyClick,
  handleTermsClick,
  loading,
  formErrors,
  validationError,
  formValues,
  setFormValues,
  setFormErrors,
  handleLoginClick,
  resetErrors,
  apiError,
  onboardingFlowAlternateStyling,
  //   t,
  children,
}: CreateLoginProps) {
  const [blurred, setBlurred] = useState<BlurTypes>({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const styles = useStyles();

  // Validations
  const emailValid = validateEmail(formValues.email);
  const passwordValidations = handleValidations(formValues.password);

  const scrollingRequired = onboardingFlowAlternateStyling;

  // prevent continue is used to avoid dismissing the modal via backdrop click
  // modal should only close once terms are accepted
  const [scrollingRequirements, setScrollingRequirements] = useState({
    isScrolled: false,
    isChecked: false,
    scrollPromptText: false,
  });

  // If we have an error, clear it on text change
  const handleTextChange = (type: keyof FormTypes) => (text: string) => {
    resetErrors();
    setFormValues((curr) => ({ ...curr, [type]: text.trim() }));
  };

  const handleBlur = (type: keyof BlurTypes) => {
    const currBlurType = blurred[type];
    if (!currBlurType) setBlurred((curr) => ({ ...curr, [type]: true }));
    if (type === 'email' && !emailValid)
      setFormErrors((curr) => ({ ...curr, email: validationError }));
  };

  const handleShowPassword = () => {
    setShowPassword((curr) => !curr);
  };

  const handleSubmit = () => {
    if (disableButton) return;

    if (scrollingRequirements.isChecked) {
      setScrollingRequirements({
        ...scrollingRequirements,
        scrollPromptText: false,
      });
    }

    handleCTAPress();
  };

  const validationObject = [
    {
      valid: passwordValidations.isLowerCase,
      text: translations.lowerCaseValidation,
    },
    {
      valid: passwordValidations.isUpperCase,
      text: translations.upperCaseValidation,
    },
    {
      valid: passwordValidations.matchesLength,
      text: translations.lengthValidation,
    },
    {
      valid: passwordValidations.hasSymbol,
      text: translations.symbolValidation,
    },
  ];

  // Web's sizing looks better with bit smaller check icon
  const checkSize = Platform.OS !== 'web' ? 24 : 18;
  // Loading, bad validations, or terms not scrolled when required should disable button
  const disableButton =
    loading ||
    !emailValid ||
    !passwordValidations.allValid ||
    (scrollingRequired && !scrollingRequirements.isChecked);

  // Show errors when we have blurred and have errors
  const emailError = formValues.email && blurred['email'] && !emailValid;
  const passwordError =
    !passwordValidations.allValid &&
    Boolean(formValues.password) &&
    blurred['password'];

  return (
    <View style={styles.container}>
      <DPText style={styles.title}>{translations.header}</DPText>
      <View style={styles.inputBox}>
        <DPTextInput
          errorMessage={formErrors.email}
          label={translations.emailInputLabel}
          showAsError={!!emailError}
          value={formValues.email}
          onBlur={() => handleBlur('email')}
          onChangeText={handleTextChange('email')}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.inputBox}>
        <DPTextInput
          errorMessage={formErrors.password}
          floatingLabel={translations.passwordInputLabel}
          secureTextEntry={!showPassword}
          showAsError={passwordError}
          value={formValues.password}
          onBlur={() => handleBlur('password')}
          onChangeText={handleTextChange('password')}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.validationContainer}>
        {validationObject.map((validation, idx) => (
          <View
            key={`${validation.text}-${idx}`}
            style={styles.singleValidation}
          >
            <Icon
              type={
                validation.valid
                  ? IconTypes.GREEN_CHECK
                  : IconTypes.EMPTY_BUBBLE
              }
              width={checkSize}
            />
            <DPText style={styles.validationText}>{validation.text}</DPText>
          </View>
        ))}
      </View>
      <Pressable style={styles.linkContainer} onPress={handleLoginClick}>
        <DPText style={styles.link}>{translations.loginLink}</DPText>
      </Pressable>
      <DPText style={styles.termsText}>
        {translations.privacyPolicyTitle}{' '}
        <DPText style={styles.link} onPress={handleTermsClick}>
          {translations.termsLink}
        </DPText>{' '}
        {translations.and}{' '}
        <DPText style={styles.link} onPress={handlePrivacyPolicyClick}>
          {translations.privacyPolicyLink}
        </DPText>
      </DPText>
      {/* )} */}
      {!!apiError && (
        <View style={styles.errorContainer}>
          <DPError
            errorMessage={apiError}
            errorTextStyle={styles.errorMessage}
          />
        </View>
      )}
      <DPButton
        disabled={disableButton}
        loading={loading}
        title={translations.cta}
        onPress={handleSubmit}
      />
      {children}
    </View>
  );
}

const useStyles = makeStyles((theme, props) => ({
  container: {
    flexDirection: 'column',
  },
  title: {
    color: theme.Text.secondary,
    fontSize: 24,
    marginBottom: 32,
  },
  inputBox: {
    marginBottom: 12,
  },
  termsText: {
    fontSize: 12,
    color: theme.Text.light,
    marginVertical: 12,
  },
  linkContainer: {
    marginTop: 48,
    marginBottom: 12,
  },
  link: {
    color: theme.Link,
  },
  validationContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  validationText: {
    color: theme.Text.secondary,
    fontSize: 12,
    marginLeft: 4,
  },
  singleValidation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '50%',
  },
  errorContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 12,
    lineHeight: 18,
    color: theme.Error,
  },
  termsBox: {
    alignItems: 'flex-start',
  },
  termsTitle: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingBottom: 10,
    paddingTop: 24,
  },
  termsSubtitle: {
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    paddingBottom: 8,
  },
  scrollView: {
    borderWidth: 1,
    borderColor: theme.Lines.baseGray10,
    maxHeight: (props?.maxHeight as DimensionValue) || 350,
    overflow: 'scroll',
    alignSelf: 'center',
  },
  checkboxText: {
    paddingLeft: 8,
    paddingBottom: 8,
    paddingTop: 16,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    lineHeight: 24,
  },
  checkbox: {
    marginRight: 8,
  },
  termsAndConditionsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  termsAndConditionsText: {
    fontWeight: 'bold',
    textDecorationLine: 'none',
  },
  termsBold: {
    textAlign: 'center',
  },
  scrollPrompt: {
    paddingTop: 16,
    color: theme.Text.disabled,
    fontSize: 12,
  },
}));
