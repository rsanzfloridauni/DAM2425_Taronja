import { StyleSheet, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { IconButton } from 'react-native-paper';

const ScreenRegistro = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.container, { width: width, height: height }]}>
      <ScrollView>
        <View style={[styles.seccion1, { width: width }]}>
          <Text style={[styles.titulo, { color: '#060055' }]}>
            Privacy policy
          </Text>
        </View>
        <View style={[styles.seccion2, { width: width }]}>
          <IconButton icon="shield-account" size={40} iconColor="green" />
          <View style={[styles.carta, { width: width * 0.7, height: 140 }]}>
            <Text style={styles.text}>
              Your privacy is our priority. We protect your data and only use it
              in accordance with our policy. See our terms of use for more
              information.
            </Text>
          </View>
        </View>
        <View style={[styles.seccion3, { width: width }]}>
          <Text style={styles.tituloPrivacidad}> 1.Information gathering </Text>
          <Text style={styles.text}>
            When you use our application, we may collect information
            automatically or voluntarily, such as user-provided personal data
            (name, email, phone number) and device usage data (IP address,
            device type, operating system version and browsing patterns within
            the application).
          </Text>
          <Text style={styles.tituloPrivacidad}> 2. Use of information </Text>
          <Text style={styles.text}>
            The information collected is used to improve the functionality of
            the app, provide technical support, personalise the user experience
            and, in some cases, to send relevant notifications. We will not
            share or sell your information to third parties without your
            consent, except as required by law.
          </Text>
          <Text style={styles.tituloPrivacidad}> 3. Storage and Security </Text>
          <Text style={styles.text}>
            We implement appropriate security measures to protect your
            information from unauthorised access, alteration or disclosure.
            However, no data transmission over the Internet or electronic
            storage is completely secure, so we cannot guarantee absolute
            security.
          </Text>
          <Text style={styles.tituloPrivacidad}>
            4. Permissions and Access to Device Data
          </Text>
          <Text style={styles.text}>
            Our app may request permissions to access device functions such as
            camera, microphone or location. These permissions will only be used
            to provide the necessary functions of the app and only with the user
            s consent.
          </Text>
          <Text style={styles.tituloPrivacidad}> 5. User Rights </Text>
          <Text style={styles.text}>
            You have the right to access, modify or delete your personal data at
            any time. You may also revoke your consent to the use of certain
            permissions through your device settings or by contacting us at
            FishHubProject@gmail.com.
          </Text>
          <Text style={styles.tituloPrivacidad}>
            6. Changes to the Privacy Policy
          </Text>
          <Text style={styles.text}>
            We reserve the right to update this privacy policy at any time. Any
            changes will be notified to users through the app or by other
            appropriate means. You are encouraged to periodically review this
            section to stay informed about how we are protecting your
            information.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
  },
  seccion1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seccion2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  seccion3: {
    flex: 3,
  },
  titulo: {
    fontSize: 35,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  carta: {
    borderWidth: 1,
    borderColor: '#FF6F00',
    borderRadius: 10,
    backgroundColor: '#fee69c',
    padding: 5,
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 12,
  },
  tituloPrivacidad: {
    fontSize: 24,
    fontStyle: 'italic',
    marginTop: 10,
    color: '#FF6F00',
  },
});

export default ScreenRegistro;
