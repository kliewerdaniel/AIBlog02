import React, { useState, useId } from 'react';
import { Box, Card, Flex, Stack, Text, TextInput } from '@sanity/ui';
import { set, unset } from 'sanity';

// Define the props for the ColorInput component
interface ColorInputProps {
  value?: string;
  onChange: (patch: any) => void;
  readOnly?: boolean;
  elementProps?: any;
}

// Custom color input component with preview
export default function ColorInput(props: ColorInputProps) {
  const { value, onChange, readOnly, elementProps } = props;
  const inputId = useId();
  const [inputValue, setInputValue] = useState(value || '');

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value;
    setInputValue(nextValue);
    
    // Validate hex color format
    const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(nextValue);
    
    if (isValidHex) {
      onChange(nextValue ? set(nextValue) : unset());
    }
  };

  // Handle color picker change
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value;
    setInputValue(nextValue);
    onChange(nextValue ? set(nextValue) : unset());
  };

  return (
    <Stack space={2}>
      <Flex align="center">
        <Box flex={1}>
          <TextInput
            id={inputId}
            value={inputValue}
            onChange={handleChange}
            readOnly={readOnly}
            {...elementProps}
            placeholder="#000000"
          />
        </Box>
        <Box marginLeft={2}>
          <input
            type="color"
            value={inputValue || '#000000'}
            onChange={handleColorChange}
            disabled={readOnly}
            style={{ width: '36px', height: '36px', padding: 0, border: 'none' }}
          />
        </Box>
      </Flex>
      {inputValue && (
        <Card 
          padding={3} 
          radius={2}
          style={{ 
            backgroundColor: inputValue,
            border: '1px solid #e2e8f0',
            height: '40px'
          }}
        >
          <Text style={{ color: getContrastColor(inputValue) }}>
            Color Preview
          </Text>
        </Card>
      )}
    </Stack>
  );
}

// Helper function to determine text color based on background color
function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#ffffff';
}
