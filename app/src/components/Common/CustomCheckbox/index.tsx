import { useCheckbox, Chip, VisuallyHidden, tv } from "@heroui/react";

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-primary hover:bg-opacity-20",
    content: "text-foreground pl-1"
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary hover:border-primary",
        content: "text-primary-foreground"
      }
    },
    isFocusVisible: {
      true: { 
        base: "",
      }
    }
  }
})

export const CustomCheckbox = (props) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props
  })

  const styles = checkbox({ isSelected, isFocusVisible })
  const { ref, ...labelProps } = getLabelProps()

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        variant="faded"
        {...labelProps}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
}