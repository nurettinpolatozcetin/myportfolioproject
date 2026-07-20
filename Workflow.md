# AI-Assisted Development Workflow Comparison

## Feature

I built the same contact form twice using two independent AI-assisted workflows. The first version was created from a single vague prompt, while the second version used a detailed prompt with technical constraints, accessibility requirements, validation rules, tests, and a verification step.

## Round One: Vague Prompt

The vague version was faster to generate, but the result required more interpretation and manual review. The implementation mainly focused on displaying a form and basic styling. It did not provide the same level of structured validation, accessibility support, or automated verification as the precise version.

Because the prompt did not define expected behavior in detail, the AI had to make assumptions about error handling, field states, success behavior, and keyboard interaction. This made the result less predictable.

## Round Two: Precise Prompt

The precise version produced a more complete implementation. The branch added a dedicated `ContactForm.jsx`, a separate `ContactForm.css`, a test file with seven test cases, `setupTests.js`, and Vitest configuration. The form included validation for required name, email, and message fields, invalid email formats, accessible error relationships, keyboard operation, successful submission behavior, and form reset behavior.

The branch comparison showed major concrete differences. The precise version added 321 lines to the form component, 224 lines of component styling, and 147 lines of automated tests. It also updated `package.json` and `vite.config.js` to support the testing workflow.

## Correctness and Edge Cases

The precise version handled empty submissions, invalid email input, error clearing after correction, invalid submission prevention, and successful submission. These behaviors were verified through automated tests rather than only visual inspection.

## Accessibility

The precise implementation included `aria-invalid`, `aria-describedby`, associated error messages, labeled controls, and keyboard navigation. These details were not clearly guaranteed by the vague prompt.

## Review Effort and AI Mistakes

The precise prompt reduced uncertainty, but the output still required review. The first generated CSS caused form controls to appear invisible or unusable, so I inspected and regenerated the styling. The generated React component also contained an incorrect import statement, which caused all seven tests to fail with `React is not defined`. I corrected the import and reran the test suite successfully.

The diff also included unnecessary generated files such as `.vite` cache files and a large `package-lock.json` change. This showed that AI-generated changes still need repository-level review, not only code review.

## Conclusion

The vague prompt was quicker initially, but the precise workflow was more reliable end-to-end. Clear constraints, examples, and automated verification produced a better result and made defects easier to detect.
