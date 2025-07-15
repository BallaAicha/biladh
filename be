package com.socgen.unibank.platform.springboot.service.settingannotations;

import com.socgen.unibank.platform.springboot.service.SettingJpaRepository;
import com.socgen.unibank.platform.springboot.service.SettingEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;

@Component
@RequiredArgsConstructor
public class SettingsValueInjector implements BeanPostProcessor {

    private final SettingJpaRepository settingJpaRepository;

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        // On ne traite que les beans annotés @HasSettingFields
        if (bean.getClass().isAnnotationPresent(HasSettingFields.class)) {
            // Pour chaque champ du bean
            ReflectionUtils.doWithFields(bean.getClass(), field -> {
                SettingValue annotation = field.getAnnotation(SettingValue.class);
                if (annotation != null) {
                    String name = annotation.name();
                    String defaultValue = annotation.defaultValue();
                    String value = settingJpaRepository.findByName(name)
                            .map(SettingEntity::getValue)
                            .orElse(defaultValue);

                    // Conversion du type si besoin
                    Object convertedValue = ConvertUtils.convert(value, field.getType());

                    field.setAccessible(true);
                    field.set(bean, convertedValue);
                }
            });
        }
        return bean;
    }
}

--------------------------------------



@HasSettingFields
@Component
public class GetContactUsSettingImpl implements GetContactUsSetting {

    @SettingValue(name = "contactus.max-retries", defaultValue = "3")
    private Integer maxRetries;

    @Override
    public GetContactUsSettingResponse handle(GetContactUsSettingRequest request, RequestContext context) {
        // Ici, maxRetries est déjà injecté automatiquement par SettingsValueInjector
        return new GetContactUsSettingResponse("Max retries from setting: " + maxRetries);
    }
}


--------
public class ConvertUtils {
    public static Object convert(String value, Class<?> targetType) {
        if (targetType == Integer.class || targetType == int.class) {
            return Integer.valueOf(value);
        } else if (targetType == Boolean.class || targetType == boolean.class) {
            return Boolean.valueOf(value);
        } else if (targetType == Long.class || targetType == long.class) {
            return Long.valueOf(value);
        } else if (targetType == String.class) {
            return value;
        }
        // Ajoute d'autres types si besoin
        throw new IllegalArgumentException("Type non supporté : " + targetType);
    }
}
