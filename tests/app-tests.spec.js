const { test, expect } = require("@playwright/test");

// Helper function to highlight element and add checkmark
async function highlightAndMark(element, label = "") {
  await element.evaluate((el, labelText) => {
    el.style.outline = "3px solid lime";
    el.style.background = "rgba(0,255,0,0.15)";
    el.style.position = "relative";

    // Add checkmark badge
    const badge = document.createElement("span");
    badge.textContent = `✅ ${labelText}`;
    badge.style.cssText = `
      position: absolute;
      top: -25px;
      left: 0;
      background: #22c55e;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      z-index: 9999;
      white-space: nowrap;
    `;
    el.appendChild(badge);
  }, label);
}

// Helper to wait and allow visual inspection
async function pause(page, ms = 800) {
  await page.waitForTimeout(ms);
}

test.describe("Fitness Challenge App - End to End Tests", () => {
  test("Complete app flow test", async ({ page }) => {
    await page.goto("/");

    // Wait for skeleton to disappear
    await page.waitForTimeout(1500);

    // ==========================================
    // TEST 1: Start Component
    // ==========================================
    console.log("🧪 Testing Start Component...");

    // Validate Start title
    const startTitle = page.locator("h1:has-text('🏁 Start Challenges 🏁')");
    await expect(startTitle).toBeVisible();
    await highlightAndMark(startTitle, "Start Title");
    await pause(page);

    // Validate challenges list exists
    const challengesList = page.locator(".challenges-list");
    await expect(challengesList).toBeVisible();
    await highlightAndMark(challengesList, "Challenges List");
    await pause(page);

    // Validate challenge cards are displayed
    const challengeCards = page.locator(".challenge-card");
    const cardsCount = await challengeCards.count();
    expect(cardsCount).toBeGreaterThan(0);
    console.log(`   ✅ Found ${cardsCount} challenge cards`);

    // Highlight first few challenge cards
    for (let i = 0; i < Math.min(3, cardsCount); i++) {
      await highlightAndMark(challengeCards.nth(i), `Challenge ${i + 1}`);
    }
    await pause(page);

    // Validate Start option in navbar is selected
    const startNavButton = page.locator(".nav-item--active").first();
    await expect(startNavButton).toBeVisible();
    await highlightAndMark(startNavButton, "Active Nav - Start");
    await pause(page);

    console.log("   ✅ Start Component - PASSED");

    // ==========================================
    // TEST 2: Challenge Detail Component
    // ==========================================
    console.log("🧪 Testing Challenge Detail...");

    // Click on first challenge
    await challengeCards.first().click();
    await pause(page);

    // Validate challenge title
    const challengeTitle = page.locator(".challenge-detail-title");
    await expect(challengeTitle).toBeVisible();
    await highlightAndMark(challengeTitle, "Challenge Title");
    await pause(page);

    // Validate back button
    const backButton = page.locator(".back-button");
    await expect(backButton).toBeVisible();
    await highlightAndMark(backButton, "Back Button");
    await pause(page);

    // Validate Challenge Friends button
    const challengeFriendsBtn = page.locator(".challenge-friends-button");
    await expect(challengeFriendsBtn).toBeVisible();
    await highlightAndMark(challengeFriendsBtn, "Challenge Friends Button");
    await pause(page);

    // Validate Description section
    const descriptionSection = page.locator(
      ".challenge-section:has-text('📝 Description')"
    );
    await expect(descriptionSection).toBeVisible();
    await highlightAndMark(descriptionSection, "Description Section");
    await pause(page);

    // Validate Duration section
    const durationSection = page.locator(
      ".challenge-section:has-text('⏱️ Duration')"
    );
    await expect(durationSection).toBeVisible();
    await highlightAndMark(durationSection, "Duration Section");
    await pause(page);

    // Validate Goals section
    const goalsSection = page.locator(
      ".challenge-section:has-text('🎯 Goals')"
    );
    await expect(goalsSection).toBeVisible();
    await highlightAndMark(goalsSection, "Goals Section");
    await pause(page);

    // Validate goal items
    const goalItems = page.locator(".goal-item");
    const goalsCount = await goalItems.count();
    expect(goalsCount).toBeGreaterThan(0);
    console.log(`   ✅ Found ${goalsCount} goal items`);

    // Highlight goal items
    for (let i = 0; i < goalsCount; i++) {
      await highlightAndMark(goalItems.nth(i), `Goal ${i + 1}`);
    }
    await pause(page);

    console.log("   ✅ Challenge Detail - PASSED");

    // ==========================================
    // TEST 3: Friends Modal
    // ==========================================
    console.log("🧪 Testing Friends Modal...");

    // Click Challenge Friends button
    await challengeFriendsBtn.click();
    await pause(page);

    // Validate modal is visible
    const modalOverlay = page.locator(".modal-overlay");
    await expect(modalOverlay).toBeVisible();

    const modalContent = page.locator(".modal-content");
    await expect(modalContent).toBeVisible();
    await highlightAndMark(modalContent, "Friends Modal");
    await pause(page);

    // Validate modal title
    const modalTitle = page.locator(".modal-title");
    await expect(modalTitle).toHaveText("👥 Challenge Friends");
    await highlightAndMark(modalTitle, "Modal Title");
    await pause(page);

    // Validate modal subtitle
    const modalSubtitle = page.locator(".modal-subtitle");
    await expect(modalSubtitle).toBeVisible();
    await highlightAndMark(modalSubtitle, "Modal Subtitle");
    await pause(page);

    // Validate close button
    const closeButton = page.locator(".modal-close");
    await expect(closeButton).toBeVisible();
    await highlightAndMark(closeButton, "Close Button");
    await pause(page);

    // Validate friends list
    const friendItems = page.locator(".friend-item");
    const friendsCount = await friendItems.count();
    expect(friendsCount).toBeGreaterThan(0);
    console.log(`   ✅ Found ${friendsCount} friends to select`);

    // Highlight and select all friends
    for (let i = 0; i < friendsCount; i++) {
      await highlightAndMark(friendItems.nth(i), `Friend ${i + 1}`);
      await friendItems.nth(i).locator("input[type='checkbox']").check();
      await pause(page, 400);
    }

    // Validate Start Challenge button is enabled
    const startChallengeBtn = page.locator(".start-challenge-button");
    await expect(startChallengeBtn).toBeEnabled();
    await highlightAndMark(startChallengeBtn, "Start Challenge Button");
    await pause(page);

    // Click Start Challenge
    await startChallengeBtn.click();
    await pause(page);

    // Validate modal is closed
    await expect(modalOverlay).not.toBeVisible();
    console.log("   ✅ Modal closed after starting challenge");

    // Validate Friends Progress section appears
    const friendsProgress = page.locator(".friends-challenge-progress");
    await expect(friendsProgress).toBeVisible();
    await highlightAndMark(friendsProgress, "Friends Progress");
    await pause(page);

    // Validate progress items
    const progressItems = page.locator(".friend-progress-item");
    const progressCount = await progressItems.count();
    expect(progressCount).toBeGreaterThan(0);
    console.log(`   ✅ Found ${progressCount} friends with progress`);

    for (let i = 0; i < progressCount; i++) {
      await highlightAndMark(progressItems.nth(i), `Progress ${i + 1}`);
    }
    await pause(page);

    console.log("   ✅ Friends Modal - PASSED");

    // ==========================================
    // TEST 4: My Challenges Component
    // ==========================================
    console.log("🧪 Testing My Challenges...");

    // Click My Challenges nav button
    const myChallengesNav = page.locator(".nav-item").nth(1);
    await myChallengesNav.click();
    await page.waitForTimeout(1500); // Wait for skeleton

    // Validate My Challenges title
    const myChallengesTitle = page.locator(
      "h1:has-text('🔥 My Challenges 🔥')"
    );
    await expect(myChallengesTitle).toBeVisible();
    await highlightAndMark(myChallengesTitle, "My Challenges Title");
    await pause(page);

    // Validate My Challenges nav is selected
    const myChallengesActiveNav = page.locator(".nav-item--active");
    await expect(myChallengesActiveNav).toBeVisible();
    await highlightAndMark(myChallengesActiveNav, "Active Nav - My Challenges");
    await pause(page);

    // Validate challenges list
    const myChallengesList = page.locator(".my-challenges-list");
    await expect(myChallengesList).toBeVisible();
    await highlightAndMark(myChallengesList, "My Challenges List");
    await pause(page);

    // Validate challenge cards
    const myChallengeCards = page.locator(".my-challenge-card");
    const myChallengesCount = await myChallengeCards.count();
    expect(myChallengesCount).toBeGreaterThan(0);
    console.log(`   ✅ Found ${myChallengesCount} user challenges`);

    for (let i = 0; i < Math.min(4, myChallengesCount); i++) {
      await highlightAndMark(myChallengeCards.nth(i), `My Challenge ${i + 1}`);
    }
    await pause(page);

    console.log("   ✅ My Challenges - PASSED");

    // ==========================================
    // TEST 5: Leaderboard Component
    // ==========================================
    console.log("🧪 Testing Leaderboard...");

    // Click Leaderboard nav button
    const leaderboardNav = page.locator(".nav-item").nth(2);
    await leaderboardNav.click();
    await page.waitForTimeout(1500); // Wait for skeleton

    // Validate Leaderboard title
    const leaderboardTitle = page.locator("h1:has-text('🏆 Leaderboard 🏆')");
    await expect(leaderboardTitle).toBeVisible();
    await highlightAndMark(leaderboardTitle, "Leaderboard Title");
    await pause(page);

    // Validate Leaderboard nav is selected
    const leaderboardActiveNav = page.locator(".nav-item--active");
    await expect(leaderboardActiveNav).toBeVisible();
    await highlightAndMark(leaderboardActiveNav, "Active Nav - Leaderboard");
    await pause(page);

    // Validate leaderboard list
    const leaderboardList = page.locator(".leaderboard-list");
    await expect(leaderboardList).toBeVisible();
    await highlightAndMark(leaderboardList, "Leaderboard List");
    await pause(page);

    // Validate leaderboard cards
    const leaderboardCards = page.locator(".leaderboard-card");
    const leaderboardCount = await leaderboardCards.count();
    expect(leaderboardCount).toBeGreaterThan(0);
    console.log(`   ✅ Found ${leaderboardCount} leaderboard entries`);

    for (let i = 0; i < leaderboardCount; i++) {
      await highlightAndMark(leaderboardCards.nth(i), `Rank ${i + 1}`);
    }
    await pause(page);

    console.log("   ✅ Leaderboard - PASSED");

    // ==========================================
    // TEST 6: My Friends Component
    // ==========================================
    console.log("🧪 Testing My Friends...");

    // Click Friends nav button
    const friendsNav = page.locator(".nav-item").nth(3);
    await friendsNav.click();
    await page.waitForTimeout(1500); // Wait for skeleton

    // Validate Friends title
    const friendsTitle = page.locator("h1:has-text('👥 My Friends 👥')");
    await expect(friendsTitle).toBeVisible();
    await highlightAndMark(friendsTitle, "My Friends Title");
    await pause(page);

    // Validate Friends nav is selected
    const friendsActiveNav = page.locator(".nav-item--active");
    await expect(friendsActiveNav).toBeVisible();
    await highlightAndMark(friendsActiveNav, "Active Nav - Friends");
    await pause(page);

    // Validate friends list
    const myFriendsList = page.locator(".my-friends-list");
    await expect(myFriendsList).toBeVisible();
    await highlightAndMark(myFriendsList, "Friends List");
    await pause(page);

    // Validate friend cards
    const friendCards = page.locator(".my-friends-card");
    const myFriendsCount = await friendCards.count();
    expect(myFriendsCount).toBeGreaterThan(0);
    console.log(`   ✅ Found ${myFriendsCount} friends`);

    for (let i = 0; i < myFriendsCount; i++) {
      await highlightAndMark(friendCards.nth(i), `Friend ${i + 1}`);
    }
    await pause(page);

    console.log("   ✅ My Friends - PASSED");

    // ==========================================
    // FINAL SUMMARY
    // ==========================================
    console.log("\n🎉 ALL TESTS PASSED! 🎉");
    console.log("================================");
    console.log("✅ Start Component");
    console.log("✅ Challenge Detail");
    console.log("✅ Friends Modal");
    console.log("✅ My Challenges");
    console.log("✅ Leaderboard");
    console.log("✅ My Friends");
    console.log("================================\n");

    // Keep page open for final review
    await page.waitForTimeout(2000);
  });
});
