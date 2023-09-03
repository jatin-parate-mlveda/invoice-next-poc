import {
  Box,
  DatePicker,
  Icon,
  LegacyCard,
  LegacyStack,
  Popover,
  TextField,
} from '@shopify/polaris';
import { CalendarMinor } from '@shopify/polaris-icons';
import { useEffect, useState } from 'react';

const DatePickerExample: React.FC<{
  onStartDateChange: (temp: any) => void;
  onEndDateChange: (temp: any) => void;
  selectedStartDate: Date;
  selectedEndDate: Date;
  setSelectedStartDate: any;
  setSelectedEndDate: any;
  startDateChanged: boolean;
  endDateChanged: boolean;
}> = ({
  onEndDateChange,
  onStartDateChange,
  selectedEndDate,
  selectedStartDate,
  setSelectedStartDate,
  setSelectedEndDate,
  startDateChanged,
  endDateChanged,
}) => {
  const [startVisible, setStartVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  const [{ startMonth, startYear }, setStartDate] = useState({
    startMonth: selectedStartDate.getMonth(),
    startYear: selectedEndDate.getFullYear(),
  });
  const [{ endMonth, endYear }, setEndDate] = useState({
    endMonth: selectedEndDate.getMonth(),
    endYear: selectedEndDate.getFullYear(),
  });
  const [formattedStartValue, setFormattedStartValue] = useState(() => {
    if (!startDateChanged) return '';
    const tempStartDate = new Date(selectedStartDate);
    tempStartDate.setDate(tempStartDate.getDate() + 1);
    return tempStartDate.toISOString().slice(0, 10);
  });

  const [formattedEndValue, setFormattedEndValue] = useState(() => {
    if (!endDateChanged) return '';
    const tempEndDate = new Date(selectedEndDate);
    tempEndDate.setDate(tempEndDate.getDate() + 1);
    return tempEndDate.toISOString().slice(0, 10);
  });
  const [startDateTrigger, setStartDateTrigger] = useState(false);
  function handleOnStartClose() {
    setStartVisible(false);
  }
  function handleOnEndClose() {
    setEndVisible(false);
  }
  function handleMonthChange(monthVal: any, yearVal: any, curr: string) {
    if (curr === 'start')
      setStartDate({ startMonth: monthVal, startYear: yearVal });
    else setEndDate({ endMonth: monthVal, endYear: yearVal });
  }
  function handleDateSelection(
    { end: newSelectedDate }: { end: Date },
    curr: string,
  ) {
    const tempNewDate = new Date(newSelectedDate);
    tempNewDate.setDate(tempNewDate.getDate() + 1);
    if (curr === 'start') {
      setFormattedStartValue(tempNewDate.toISOString().slice(0, 10));
      onStartDateChange(newSelectedDate);
      setSelectedStartDate(newSelectedDate);
      setStartVisible(false);
      setStartDateTrigger(true);
    } else {
      setFormattedEndValue(tempNewDate.toISOString().slice(0, 10));
      onEndDateChange(newSelectedDate);
      setSelectedEndDate(newSelectedDate);
      setEndVisible(false);
    }
  }
  useEffect(() => {
    if (selectedStartDate) {
      setStartDate({
        startMonth: selectedStartDate.getMonth(),
        startYear: selectedStartDate.getFullYear(),
      });
    }
  }, [selectedStartDate]);
  useEffect(() => {
    if (selectedEndDate) {
      setEndDate({
        endMonth: selectedEndDate.getMonth(),
        endYear: selectedEndDate.getFullYear(),
      });
    }
  }, [selectedEndDate]);
  return (
    <LegacyStack alignment='center'>
      <Box minWidth='276px' padding={{ xs: '2' }}>
        <Popover
          active={startVisible}
          autofocusTarget='none'
          preferredAlignment='left'
          fullWidth
          preferInputActivator={false}
          preferredPosition='below'
          preventCloseOnChildOverlayClick
          onClose={() => handleOnStartClose}
          activator={
            <TextField
              placeholder='YYYY-MM-DD'
              role='combobox'
              label='Start date'
              prefix={<Icon source={CalendarMinor} />}
              value={formattedStartValue}
              onFocus={() => {
                setStartVisible(true);
                setEndVisible(false);
              }}
              autoComplete='off'
            />
          }
        >
          <LegacyCard>
            <LegacyCard.Section>
              <DatePicker
                disableDatesAfter={selectedEndDate || new Date()}
                month={startMonth}
                year={startYear}
                selected={selectedStartDate}
                onMonthChange={(monthVal, yearVal) =>
                  handleMonthChange(monthVal, yearVal, 'start')
                }
                onChange={range => {
                  handleDateSelection(range, 'start');
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Popover>
        <Popover
          active={endVisible}
          autofocusTarget='none'
          preferredAlignment='left'
          fullWidth
          preferInputActivator={false}
          preferredPosition='below'
          preventCloseOnChildOverlayClick
          onClose={() => handleOnEndClose}
          activator={
            <TextField
              placeholder='YYYY-MM-DD'
              role='combobox'
              label='End date'
              prefix={<Icon source={CalendarMinor} />}
              value={formattedEndValue}
              onFocus={() => {
                setEndVisible(true);
                setStartVisible(false);
              }}
              autoComplete='off'
            />
          }
        >
          <LegacyCard>
            <LegacyCard.Section>
              <DatePicker
                disableDatesAfter={new Date()}
                disableDatesBefore={
                  startDateTrigger ? selectedStartDate : undefined
                }
                month={endMonth}
                year={endYear}
                selected={selectedEndDate}
                onMonthChange={(monthVal, yearVal) =>
                  handleMonthChange(monthVal, yearVal, 'end')
                }
                onChange={range => {
                  handleDateSelection(range, 'end');
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Popover>
      </Box>
    </LegacyStack>
  );
};
export default DatePickerExample;
