# Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring GitHub integration, dark/light theme support, and mobile-first design.

## Features

- 🌙 Dark/Light theme with system preference detection
- 📱 Fully responsive design
- 🔗 GitHub API integration for dynamic project display
- ⚡ Fast loading with optimized images
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 📊 Real-time GitHub repository stats
- 🔄 Smooth animations and transitions

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

\`\`\`env
# Required: Your GitHub username
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username

# Optional: GitHub Personal Access Token for higher rate limits
# Without this, you're limited to 60 requests per hour
# With token, you get 5000 requests per hour
GITHUB_TOKEN=your-github-token
\`\`\`

### 2. GitHub Token Setup (Optional but Recommended)

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "Portfolio Website"
4. Select scopes: `public_repo` (for accessing public repositories)
5. Copy the generated token and add it to your `.env.local` file

### 3. Project Configuration

#### Controlling Which Projects Are Displayed

The website automatically fetches your GitHub repositories and displays them. You can control which projects appear by:

**Method 1: Repository Topics (Recommended)**
Add topics to your GitHub repositories to categorize them:
- `portfolio` - Will be prioritized in display
- `mobile-app` - For mobile applications
- `web-app` - For web applications
- `featured` - To highlight important projects

**Method 2: Repository Description**
Ensure your repositories have clear, descriptive descriptions as these are used as project descriptions on the website.

**Method 3: Custom Filtering**
Edit `lib/projects-data.ts` to customize the filtering logic:

\`\`\`typescript
// Example: Only show repositories with specific topics
const filteredRepos = repos.filter(repo => 
  repo.topics?.includes('portfolio') || 
  repo.topics?.includes('featured')
)

// Example: Exclude certain repositories
const filteredRepos = repos.filter(repo => 
  !['repo-to-exclude', 'another-repo'].includes(repo.name)
)
\`\`\`

#### Project Display Priority

Projects are displayed in this order:
1. Repositories with `featured` topic
2. Repositories with `portfolio` topic
3. Most recently updated repositories
4. Repositories with the most stars

#### Fallback Projects

If GitHub API fails or no repositories are found, the website falls back to static projects defined in `lib/projects-data.ts`. You can customize these fallback projects by editing the `projects` array.

### 4. Customization

#### Personal Information
Update the following files with your information:
- `app/page.tsx` - Hero section name and description
- `app/about/page.tsx` - About section content
- `app/contact/page.tsx` - Contact information
- `components/navigation.tsx` - Navigation links

#### Styling and Theme
- `app/globals.css` - Global styles and theme variables
- `components/theme-provider.tsx` - Theme configuration
- Default theme is set to dark mode

#### Project Images
- GitHub repositories without images will use placeholder images
- Add a `preview.png` or `screenshot.png` to your repository root for custom project images
- Or add images to the `public/` folder and reference them in the fallback projects

### 5. Deployment

#### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_GITHUB_USERNAME`
   - `GITHUB_TOKEN` (optional)
4. Deploy

#### Other Platforms
The website is a standard Next.js application and can be deployed to any platform that supports Node.js.

## Project Structure

\`\`\`
├── app/
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact page
│   ├── projects/page.tsx       # Projects page
│   ├── page.tsx               # Homepage
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── navigation.tsx         # Navigation component
│   ├── theme-provider.tsx     # Theme provider
│   ├── theme-toggle.tsx       # Theme toggle button
│   └── typing-animation.tsx   # Typing animation
├── lib/
│   ├── github-api.ts          # GitHub API service
│   ├── projects-data.ts       # Projects data and fallback
│   └── utils.ts               # Utility functions
└── public/                    # Static assets
\`\`\`

## Troubleshooting

### GitHub API Issues
- **Rate limiting**: Add a GitHub token to increase rate limits
- **No repositories showing**: Check that your repositories are public
- **Missing project data**: Ensure repositories have descriptions and topics

### Theme Issues
- **Theme not persisting**: Check that localStorage is enabled in your browser
- **Flash of wrong theme**: This is normal on first load, the theme will correct itself

### Performance Issues
- **Slow loading**: GitHub API calls are cached for 5 minutes
- **Images not loading**: Check that image URLs are accessible

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
