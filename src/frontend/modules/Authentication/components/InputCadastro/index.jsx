import { Text, TextInput, View,TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { Controller } from "react-hook-form";
import { forwardRef, useState } from "react";
import clsx from "clsx";

const Input = forwardRef(({ icon, formProps, inputProps, error = '' }, ref) => {
    return (
        <Controller
            {...formProps}
            render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.container}>
                    <View style={styles.group}>
                        <View style={styles.icon}>
                            <Feather
                                name={icon}
                                size={24}
                                color={clsx({
                                    ["#DC1637"]: error.length > 0,
                                    ["#96CA5E"]: value && error.length === 0,
                                    ["#999"]: !value && error.length === 0,
                                })}
                            />
                        </View>
                        <TextInput
                            ref={ref}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            style={styles.control}
                            {...inputProps}
                        />
                    </View>
                    {error.length > 0 && (
                        <Text style={styles.error}>
                            {error}
                        </Text>
                    )}
                </View>
            )}
        />
    );
});

export { Input };
