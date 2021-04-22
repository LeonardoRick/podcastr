import { convertDurationToTimeString } from './convertDurationToTimeString';

test.each`
  seconds    | result
  ${3600}    | ${'01:00:00'}
  ${7200}    | ${'02:00:00'}
`('changes $seconds to formated HH:mm:ss', ({ seconds, result }) => {
  expect(convertDurationToTimeString(seconds)).toEqual(result);
});
