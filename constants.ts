import { BookPage, PageType } from './types';

export const AUTHOR_NAME = "Developer Canduri Franklin";
export const BOOK_TITLE = "JAVA GENESIS";
export const BOOK_SUBTITLE = "THE ERA OF AUGMENTED DEVELOPMENT";

export const BOOK_PAGES: BookPage[] = [
  {
    id: 1,
    type: PageType.COVER,
    title: BOOK_TITLE,
    subtitle: BOOK_SUBTITLE,
    content: [
      "How Generative AI is redefining productivity, elevating quality, and transforming programmers into architects within the Java ecosystem."
    ],
    visualDescription: "A futuristic AI robot holding a glowing Java crystal",
  },
  {
    id: 2,
    type: PageType.CONTENT,
    title: "01. THE DEMISE OF BOILERPLATE",
    content: [
      "The Java ecosystem is legendary for its enterprise-scale stability, but equally infamous for its 'ceremony': the excessive amount of repetitive code required for even the simplest tasks. Getters, setters, verbose XML configurations, and redundant DTOs have long been the tax paid for robustness.",
      "Until now.",
      "Generative AI does not arrive to replace the Java developer; it arrives to liberate them. Envision AI as a 'Cognitive Exoskeleton'. You, the developer, remain in command of the architecture, but the AI lifts the heavy burden of routine coding."
    ],
    bulletPoints: [
      "**Reduced Manual Labor:** Automate up to 40% of repetitive tasks.",
      "**Business Focus:** Reclaim hours lost to configuration and invest them in solving real-world problems.",
      "**Velocity:** Accelerate from concept to deployment in record time."
    ],
    cta: "AI won't take your job. A Java developer who masters AI will replace one who refuses to use it."
  },
  {
    id: 3,
    type: PageType.CONTENT,
    title: "02. FROM INTENT TO IMPLEMENTATION",
    content: [
      "The magic happens when your natural language translates directly into modern, optimized Java code."
    ],
    codeSnippets: [
      {
        language: "java",
        caption: "A. Complex Queries (Spring Data JPA)",
        code: `// Prompt: "Create a query for 'PREMIUM' users registered 30 days ago with purchases > $100."

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.registrationDate >= :startDate AND u.status = 'PREMIUM' AND u.lastPurchaseAmount > :minAmount")
    Page<User> findPremiumUsers(@Param("startDate") LocalDate date, @Param("minAmount") BigDecimal amount, Pageable pageable);
}`
      },
      {
        language: "java",
        caption: "B. Unit Testing (JUnit 5)",
        code: `// Prompt: "Generate a test for when a user is not found during update."

@Test
void updateNonExistentUserThrowsException() {
    when(userRepository.findById(99L)).thenReturn(Optional.empty());
    assertThrows(UserNotFoundException.class, () -> {
        userService.updateUser(99L, dto);
    });
}`
      }
    ]
  },
  {
    id: 4,
    type: PageType.CONTENT,
    title: "03. THE LEGACY RENAISSANCE",
    content: [
      "Maintaining legacy code is costly. AI acts as a Senior Consultant to modernize your applications instantly.",
      "**Intelligent Refactoring:** Transform archaic loops into modern Java Streams automatically."
    ],
    codeSnippets: [
      {
        language: "java",
        caption: "Legacy Loop (Before)",
        code: `for (User user : allUsers) {
    if (user.isActive()) { names.add(user.getName()); }
}`
      },
      {
        language: "java",
        caption: "AI Modernized Stream (After)",
        code: `List<String> names = allUsers.stream()
    .filter(User::isActive)
    .map(User::getName)
    .collect(Collectors.toList());`
      }
    ],
    bulletPoints: [
      "**Quality Shield:** Generate instant Javadocs for undocumented methods.",
      "**Security:** Detect vulnerabilities (like SQL injection risks) before compilation.",
      "**Standardization:** Enforce team coding standards across the entire codebase."
    ]
  },
  {
    id: 5,
    type: PageType.CLOSING,
    title: "04. FROM CODER TO ARCHITECT",
    content: [
      "The role of the developer is evolving to a higher level of abstraction. Value no longer lies in memorizing syntax, but in designing resilient, scalable systems."
    ],
    bulletPoints: [
      "**Integrate AI Today:** Use GitHub Copilot or Gemini in your IDE.",
      "**Supervise, Don't Copy:** Cultivate critical thinking; you are the expert validator.",
      "**Design First:** Focus on Hexagonal Architecture and Microservices patterns."
    ],
    cta: "Generative AI is the fuel. You are the engine. Are you ready to evolve?"
  }
];