import { convertDurationToTimeString } from './convertDurationToTimeString';

test.each`
  seconds   | result
  ${3600}   | ${'01:00:00'}
  ${7200}   | ${'02:00:00'}
  ${3981}   | ${'01:06:21'}
  ${0}      | ${'00:00:00'}
`('changes $seconds to formated $result', ({ seconds, result }) => {
  expect(convertDurationToTimeString(seconds)).toEqual(result);
});
