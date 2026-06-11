import os
import requests
from collections import defaultdict

# Setup credentials
TOKEN = os.getenv("ACCESS_TOKEN") or os.getenv("GITHUB_TOKEN")
USER = os.getenv("GITHUB_ACTOR") or "Yoganataa"
HEADERS = {"Authorization": f"token {TOKEN}"} if TOKEN else {}

def fetch_repos():
    repos = []
    page = 1
    while True:
        url = f"https://api.github.com/users/{USER}/repos?per_page=100&page={page}"
        print(f"Fetching {url}...")
        res = requests.get(url, headers=HEADERS)
        if res.status_code != 200:
            break
        data = res.json()
        if not data:
            break
        repos.extend(data)
        page += 1
    return repos

def fetch_user_info():
    res = requests.get(f"https://api.github.com/users/{USER}", headers=HEADERS)
    if res.status_code == 200:
        return res.json()
    return {}

def generate_overview_svg(stats):
    svg = f"""<svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" fill="none">
    <style>
        .header {{ font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2f81f7; }}
        .stat {{ font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #c9d1d9; }}
        .bg {{ fill: #0d1117; stroke: #30363d; stroke-width: 1px; rx: 6px; }}
    </style>
    <rect x="0.5" y="0.5" width="399" height="199" class="bg"/>
    <text x="25" y="35" class="header">{USER}'s GitHub Stats</text>
    
    <text x="25" y="70" class="stat">⭐ Total Stars:</text>
    <text x="375" y="70" class="stat" text-anchor="end">{stats['stars']}</text>
    
    <text x="25" y="100" class="stat">🔄 Total Forks:</text>
    <text x="375" y="100" class="stat" text-anchor="end">{stats['forks']}</text>
    
    <text x="25" y="130" class="stat">📦 Repositories:</text>
    <text x="375" y="130" class="stat" text-anchor="end">{stats['repos']}</text>
    
    <text x="25" y="160" class="stat">👥 Followers:</text>
    <text x="375" y="160" class="stat" text-anchor="end">{stats['followers']}</text>
</svg>"""
    return svg

def generate_languages_svg(langs):
    total_size = sum(langs.values())
    if total_size == 0: total_size = 1
    
    sorted_langs = sorted(langs.items(), key=lambda x: x[1], reverse=True)[:5]
    
    svg = f"""<svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" fill="none">
    <style>
        .header {{ font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2f81f7; }}
        .lang-name {{ font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #c9d1d9; }}
        .lang-pct {{ font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #8b949e; }}
        .bg {{ fill: #0d1117; stroke: #30363d; stroke-width: 1px; rx: 6px; }}
        .progress-bg {{ fill: #21262d; rx: 3px; }}
        .progress-bar {{ fill: #2f81f7; rx: 3px; }}
    </style>
    <rect x="0.5" y="0.5" width="399" height="199" class="bg"/>
    <text x="25" y="35" class="header">Top Languages</text>
    """
    
    y_pos = 65
    for lang, size in sorted_langs:
        pct = (size / total_size) * 100
        # draw text
        svg += f"""
        <text x="25" y="{y_pos}" class="lang-name">{lang}</text>
        <text x="375" y="{y_pos}" class="lang-pct" text-anchor="end">{pct:.1f}%</text>
        """
        # draw progress bar
        bar_width = (pct / 100) * 350
        svg += f"""
        <rect x="25" y="{y_pos + 10}" width="350" height="6" class="progress-bg"/>
        <rect x="25" y="{y_pos + 10}" width="{bar_width}" height="6" class="progress-bar"/>
        """
        y_pos += 26
        
    svg += "</svg>"
    return svg

def main():
    print(f"Generating stats for {USER}...")
    repos = fetch_repos()
    user_info = fetch_user_info()
    
    stars = sum(r.get("stargazers_count", 0) for r in repos)
    forks = sum(r.get("forks_count", 0) for r in repos)
    
    print("Fetching languages...")
    langs_bytes = defaultdict(int)
    for r in repos:
        if r.get("fork"): continue  # ignore forks for accurate language stats
        
        lang_url = r.get("languages_url")
        if not lang_url: continue
        res = requests.get(lang_url, headers=HEADERS)
        if res.status_code == 200:
            data = res.json()
            for l, bytes_cnt in data.items():
                langs_bytes[l] += bytes_cnt
                
    stats = {
        "stars": stars,
        "forks": forks,
        "repos": len(repos),
        "followers": user_info.get("followers", 0)
    }
    
    if not os.path.exists("generated"):
        os.makedirs("generated")
        
    with open("generated/overview.svg", "w", encoding="utf-8") as f:
        f.write(generate_overview_svg(stats))
        
    with open("generated/languages.svg", "w", encoding="utf-8") as f:
        f.write(generate_languages_svg(langs_bytes))
        
    print("Generation complete! SVG files saved to 'generated/' folder.")

if __name__ == "__main__":
    main()
