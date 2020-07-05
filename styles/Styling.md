# Styling Elements with Material UI

## Styling Based on Breakpoint

[Material UI Breakpoint Documentation](https://material-ui.com/customization/breakpoints/)

If you have a style you want to change at a certain screen size (also known as a "breakpoint"), you can trigger this behavior by passing in values as an array to an element that supports this (like a `Box`). Material UI supports five by default:

| Name        | Variable | Default Size |
|------------ | -------- | ------------ |
| Extra Small | `xs`     | 0px          |
| Small       | `sm`     | 600px        |
| Medium      | `md`     | 960px        |
| Large       | `lg`     | 1280px       |
| Extra Large | `xl`     | 1920px       |


### Changing Values at Certain Breakpoints

Let's say you have a `Box` element, and you want its text to be different sizes at different breakpoints. You can achieve that by passing in the values in an array, where each entry corresponds to a value above:

```js
<Box fontSize={['1.5rem', '1.25rem', '1rem']}>Text!</Box>
```
In this example, the smallest breakpoint will have text that is `1.5rem`, the next-largest breakpoint will have test that is `1.25rem`, and all breakpoints larger than that will have text that is `1rem` large.

The majority of our use cases for using breakpoints will relate to Grid behavior, however, which is great news- it has some properties we can leverage to make things simpler than the above.


## Using Grid

[Material UI documentation for Grid](https://material-ui.com/components/grid/)

The two most common values you'll need to work with in the Grid are:

- The width of Grid items in relation to each other
- Changing that width at a certain breakpoint

The width of Grid items is based on the number 12, so finding the correct width for your usecase will work like this:

| Desired Width | Grid Number Value |
|---------- | --------------------- |
| 100%      | 12                    |
| 80%       |  8                    |
| 50%       |  6                    |
| 33%       |  4                    |
| 25%       |  3                    |

### Using the Grid with Breakpoints

If you want this value to change based on a breakpoint, you can leverage the following values to do so:

`xs`, `sm`, `md`, `lg`, `xl`

The value used will be the smallest breakpoint that that style will be applied. So if I wanted an element to be 100% width for mobile and tablet sizes, but 50% for desktop, that might look like this:

```js
<Grid item sm={12} lg={6}>An item!</Grid>
```
If a breakpoint is skipped (not how `md` is missing in the example) the next-smallest value will be used.

