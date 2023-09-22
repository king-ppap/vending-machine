# Front-end site

## What I found

1. CSS Tailwind conflict

    Solution remove this from `globals.css`

    ```css
    @tailwind base;
    @tailwind components;
    ```

2. `useSWR` only need to auto sync data
3. Store `setInterval` in [useRef](https://react.dev/reference/react/useRef#useref)

## Note (idea) 🤔

1. Return money to customer when system down
   - Store amount to localStorage
