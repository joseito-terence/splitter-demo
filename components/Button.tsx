import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  icon?: React.ReactNode;
  textClassName?: string;
}

export const Button = ({ children, icon = null, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity {...props} className={`${styles.button} ${props.className}`}>
      {icon}
      <Text className={`${styles.buttonText} ${props.textClassName}`}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: 'flex-row justify-center items-center bg-indigo-500 rounded-[28px] p-4',
  buttonText: 'text-white text-lg font-semibold text-center',
};
