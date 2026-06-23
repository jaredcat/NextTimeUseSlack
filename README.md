# Next Time, Use Slack

**[jaredcat.github.io/NextTimeUseSlack](https://jaredcat.github.io/NextTimeUseSlack)**

A small toy project that answers a question I kept asking during all-hands meetings at my first job: *how much of our salaries are going into this meeting alone?*

Sitting in a huge room while someone read slides off a screen, I looked around and did the math in my head. It was a lot. Time is not free, and meetings with too many people—or meetings that drag on—are not just a waste of time. They are a waste of money. Couldn't we spend it on something better?

This app makes that number impossible to ignore.

## What it does

Enter how many people are in the meeting, their average annual salary, and how long the meeting runs. The app shows:

- **Total cost** of the meeting
- **Cost per minute** while it burns

Two modes:

- **Static** — plug in a meeting length and see the total upfront
- **Timer** — start a live counter and watch the dollars tick up in real time

There is also **Zoom Mode**, which strips the UI down so you can share it as a virtual camera background in [OBS](https://obsproject.com/) during an actual meeting. Press `Esc` to exit.

Settings sync to the URL, so you can bookmark or share a specific scenario.

## Try it

Live at **[jaredcat.github.io/NextTimeUseSlack](https://jaredcat.github.io/NextTimeUseSlack)**.

Example: 20 people at $100,000/year for a 30-minute meeting → about **$800 burned**.

## URL parameters

| Param | Meaning | Default |
|-------|---------|---------|
| `p` | Number of people | `20` |
| `s` | Average annual salary (USD) | `100000` |
| `t` | Meeting length (minutes) | `30` |
| `mode` | `static` or `timer` | `static` |
| `z` | Zoom mode (`1` / `0`) | `0` |

Example:

```
https://jaredcat.github.io/NextTimeUseSlack/?p=50&s=120000&t=60&mode=timer
```

## How the math works

Salary is spread across **125,220 working minutes per year** (~2,087 hours). From there:

```
cost per minute = (people × average salary) / 125,220
total cost      = cost per minute × meeting minutes
```

This is a rough back-of-the-napkin estimate—not payroll, benefits, or opportunity cost. Good enough to make the point.

## Local development

Requires Node.js and Yarn.

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
yarn build    # production build
yarn export   # static export to out/ (used for GitHub Pages)
yarn lint     # Biome check
```

## Tech stack

- [Next.js](https://nextjs.org/) (static export)
- [React](https://react.dev/)
- [Emotion](https://emotion.sh/) for styling
- [React Spring](https://www.react-spring.dev/) for the odometer animations
- [Biome](https://biomejs.dev/) for linting and formatting

Deployed to GitHub Pages on push to `main`.

## License

Apache 2.0 — see [LICENSE](LICENSE).

---

Made for fun. Next time, maybe just use Slack.
