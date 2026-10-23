# FACULDADE DE TECNOLOGIA DE SÃO CAETANO DO SUL – ANTONIO RUSSO
## CURSO SUPERIOR DE TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS

<br><br><br>

**BERNARDO JOSÉ SANTANA OLIVEIRA**  
**DANIEL YONESHIGE JUNIOR**  
**GUILHERME LOURENZO ASSUMPÇÃO**  
**GUILHERME BORGES MONTEIRO**  
**JOÃO VICTOR DANIEL NOGUEIRA DO SANTOS**  

<br><br><br><br>

# BEAUTYHUB: PLATAFORMA DE GESTÃO E AGENDAMENTO DIGITAL COM AMBIENTE MODIFICÁVEL PARA O SETOR DE ESTÉTICA

<br><br><br><br><br><br>

**SÃO CAETANO DO SUL**  
**2026**

---

<br><br>

**BERNARDO JOSÉ SANTANA OLIVEIRA**  
**DANIEL YONESHIGE JUNIOR**  
**GUILHERME LOURENZO ASSUMPÇÃO**  
**GUILHERME BORGES MONTEIRO**  
**JOÃO VICTOR DANIEL NOGUEIRA DO SANTOS**  

<br><br><br>

# BEAUTYHUB: PLATAFORMA DE GESTÃO E AGENDAMENTO DIGITAL COM AMBIENTE MODIFICÁVEL PARA O SETOR DE ESTÉTICA

<br><br>

> Trabalho de Conclusão de Curso apresentado à Faculdade de Tecnologia de São Caetano do Sul – Antonio Russo, como requisito parcial para a obtenção do título de Tecnólogo em Análise e Desenvolvimento de Sistemas.  
>  
> **Área de Concentração:** Engenharia de Software e Sistemas Web  
> **Orientador:** Prof. Dr. Jacinto Carlos Ascencio Cansado

<br><br><br><br>

**SÃO CAETANO DO SUL**  
**2026**

---

## DEDICATÓRIA

*Dedicamos este trabalho a todas as mulheres microempreendedoras do setor da beleza e estética que, com resiliência, determinação e talento, transformam suas realidades e impulsionam a economia de suas comunidades. Dedicamos também aos nossos familiares, que nos apoiaram incondicionalmente ao longo de toda a nossa jornada acadêmica.*

---

## AGRADECIMENTOS

Agradecemos, em primeiro lugar, a Deus, pela força, saúde e sabedoria concedidas ao longo de toda a nossa formação universitária.

À Faculdade de Tecnologia de São Caetano do Sul – Antonio Russo (FATEC SCS), ao Centro Paula Souza e ao corpo docente do curso de Análise e Desenvolvimento de Sistemas, por nos transmitirem não apenas conteúdos técnicos de excelência, mas princípios éticos e profissionais fundamentais para as nossas carreiras.

Aos nossos professores orientadores, em especial pela dedicação, paciência, conselhos precisos e visão crítica que permitiram amadurecer este projeto desde a concepção do modelo de negócios até a homologação da arquitetura computacional.

Aos nossos familiares e amigos, que compreenderam nossas ausências nos fins de semana e noites de desenvolvimento, oferecendo acolhimento, incentivo contínuo e suporte emocional indispensável.

A todos os colegas de curso, pelas trocas de conhecimento e pelas noites de estudos compartilhadas.

---

## EPÍGRAFE

> "Software é uma ótima combinação entre arte e engenharia. Quando você finalmente vê as pessoas usando algo que você construiu para melhorar as vidas delas, tudo ganha sentido."  
> — *Bill Gates*

---

## RESUMO

O presente Trabalho de Conclusão de Curso descreve a concepção, modelagem, implementação e validação da plataforma **BeautyHub**, um ecossistema digital de gestão e agendamento de serviços estéticos voltado a mitigar os gargalos operacionais enfrentados por microempreendedoras individuais (MEIs) e profissionais autônomas do segmento da beleza (como manicures, maquiadoras, cabeleireiras e extensionistas de cílios). Historicamente, a gestão das microempresas do ramo apoia-se em fluxos analógicos, cadernos físicos ou trocas fragmentadas de mensagens em aplicativos de conversação, o que frequentemente acarreta desencontros de horários, perda de faturamento, conflitos de sobreposição de reservas (*overbooking*) e sobrecarga na comunicação com a clientela. Para solucionar tais desafios, o BeautyHub foi concebido sob o paradigma de "ambiente modificável", capacitando cada gestora a parametrizar de forma autônoma seu catálogo de serviços, durações personalizadas, precificação informativa, jornadas de atendimento, pausas intrajornada e escalas de funcionárias. A solução foi projetada sob uma arquitetura limpa em camadas, adotando o framework full-stack **Nuxt 4** integrado ao **Vue.js 3**, **TypeScript**, estilização por **Nuxt UI** e banco de dados orientado a documentos **MongoDB** gerenciado através do ODM **Mongoose**. Para além da interface transacional responsiva (*Mobile-First*), o sistema incorpora um motor assíncrono de tarefas em segundo plano baseado em **Agenda.js**, emissão transacional de e-mails via **Resend** e atualizações em tempo real com **Server-Sent Events (SSE)** para lembretes automáticos e notificações de status de agendamentos. A engenharia de requisitos abrangeu a formalização de 16 requisitos funcionais e 10 requisitos não funcionais, especificação detalhada de 16 casos de uso em tabelas normalizadas, diagramação UML (casos de uso, classes e diagramas de sequência comportamentais) e um plano de testes funcionais sistemático. Os resultados obtidos comprovaram a eliminação total de conflitos de horário via índices compostos no banco de dados, redução sensível do tempo despendido em tarefas de agendamento e uma experiência de autosserviço transparente e fluida para as clientes finais.

**Palavras-chave:** Engenharia de Software; Agendamento Digital; Empreendedorismo Feminino; Nuxt; MongoDB; Arquitetura em Camadas.

---

## ABSTRACT

This Final Graduation Project describes the design, modeling, implementation, and validation of the **BeautyHub** platform, a digital management and service scheduling ecosystem engineered to mitigate operational bottlenecks experienced by sole proprietorships, individual micro-entrepreneurs (MEIs), and independent beauty professionals (such as manicurists, makeup artists, hairstylists, and lash technicians). Historically, management in small beauty establishments has relied heavily on analog workflows, physical notebooks, or fragmented instant messaging conversations, which routinely leads to scheduling misalignments, missed revenues, double-booking conflicts (*overbooking*), and cognitive overload in client communications. To address these challenges, BeautyHub was architected around the paradigm of a "modifiable environment," enabling each business manager to autonomously configure service catalogs, estimated durations, informative price tables, working hours, break periods, and multi-staff schedules. The software was engineered upon a clean layered architecture, adopting the full-stack framework **Nuxt 4** coupled with **Vue.js 3**, **TypeScript**, **Nuxt UI** design tokens, and a document-oriented database powered by **MongoDB** and **Mongoose** ODM. Beyond a highly responsive, mobile-first interface, the platform incorporates an asynchronous background job processing engine orchestrated by **Agenda.js**, transactional email delivery powered by **Resend**, and real-time client notifications via **Server-Sent Events (SSE)** for automatic reminder dispatches and schedule status updates. Software engineering procedures included the formal definition of 16 functional requirements and 10 non-functional requirements, exhaustive tabular specifications for 16 use cases, comprehensive UML diagrams (use case, domain class, and behavioral sequence diagrams), and a systematic functional testing suite. The achieved results verified the complete prevention of booking conflicts via compound database indexes, a significant reduction in operational overhead for scheduling, and a seamless self-service experience for end consumers.

**Keywords:** Software Engineering; Digital Scheduling; Female Entrepreneurship; Nuxt; MongoDB; Layered Architecture.

---

## LISTA DE ILUSTRAÇÕES E GRÁFICOS

- **Figura 1** – Arquitetura Geral do Sistema BeautyHub em Camadas
- **Figura 2** – Modelo de Navegação Global do Sistema
- **Figura 3** – Diagrama Geral de Casos de Uso (UML)
- **Figura 4** – Diagrama de Classes de Domínio (UML)
- **Figura 5** – Diagrama Entidade-Relacionamento Lógico (Coleções MongoDB)
- **Figura 6** – Diagrama de Sequência: Autenticação e Login de Usuário (DS01)
- **Figura 7** – Diagrama de Sequência: Cadastro de Empresa com Integração ViaCEP (DS02)
- **Figura 8** – Diagrama de Sequência: Parametrização da Agenda e Pausas (DS03)
- **Figura 9** – Diagrama de Sequência: Cálculo Dinâmico de Slots Disponíveis (DS04)
- **Figura 10** – Diagrama de Sequência: Reserva de Horário e Agendamento de Job (DS05)
- **Figura 11** – Diagrama de Sequência: Conclusão de Serviço e Notificação SSE (DS06)
- **Figura 12** – Diagrama de Sequência: Avaliação de Atendimento Concluído (DS07)
- **Figura 13** – Interface do Usuário: Página Inicial (Landing Page)
- **Figura 14** – Interface do Usuário: Formulário Unificado de Cadastro
- **Figura 15** – Interface do Usuário: Busca de Serviços e Estabelecimentos (Cliente)
- **Figura 16** – Interface do Usuário: Seleção de Serviços e Calendário Interativo
- **Figura 17** – Interface do Usuário: Histórico de Agendamentos e Avaliações
- **Figura 18** – Interface da Empresa: Dashboard Operacional do Dia
- **Figura 19** – Interface da Empresa: Gestão do Catálogo de Procedimentos
- **Figura 20** – Interface da Empresa: Parametrização de Horários e Funcionários
- **Figura 21** – Interface Administrativa: Painel de Governança e Métricas Globais

---

## LISTA DE TABELAS E QUADROS

- **Quadro 1** – Requisitos Funcionais do Sistema BeautyHub
- **Quadro 2** – Requisitos Não Funcionais do Sistema BeautyHub
- **Quadro 3** – Regras de Negócio do Sistema BeautyHub
- **Quadro 4** – Documentação do Ator: Usuário Geral
- **Quadro 5** – Documentação do Ator: Administrador
- **Quadro 6** – Documentação do Ator: Empresa (MEI / Gestora)
- **Quadro 7** – Documentação do Ator: Cliente (Consumidora Final)
- **Quadro 8** – Especificação de Caso de Uso CSU001: Cadastrar Cliente
- **Quadro 9** – Especificação de Caso de Uso CSU002: Efetuar Login
- **Quadro 10** – Especificação de Caso de Uso CSU003: Recuperar Senha
- **Quadro 11** – Especificação de Caso de Uso CSU004: Visualizar Dashboard Administrativo
- **Quadro 12** – Especificação de Caso de Uso CSU005: Cadastrar Empresa
- **Quadro 13** – Especificação de Caso de Uso CSU006: Manter Status da Empresa
- **Quadro 14** – Especificação de Caso de Uso CSU007: Manter Catálogo de Serviços
- **Quadro 15** – Especificação de Caso de Uso CSU008: Configurar Agenda de Atendimento
- **Quadro 16** – Especificação de Caso de Uso CSU009: Gerenciar Equipe de Funcionárias
- **Quadro 17** – Especificação de Caso de Uso CSU010: Visualizar Agenda Diária da Empresa
- **Quadro 18** – Especificação de Caso de Uso CSU011: Atualizar Status do Atendimento
- **Quadro 19** – Especificação de Caso de Uso CSU012: Buscar Empresas e Serviços
- **Quadro 20** – Especificação de Caso de Uso CSU013: Consultar Disponibilidade e Agendar Serviço
- **Quadro 21** – Especificação de Caso de Uso CSU014: Visualizar Histórico de Agendamentos
- **Quadro 22** – Especificação de Caso de Uso CSU015: Cancelar Agendamento
- **Quadro 23** – Especificação de Caso de Uso CSU016: Avaliar Atendimento Concluído
- **Quadro 24** – Matriz de Rastreabilidade de Requisitos e Casos de Uso
- **Quadro 25** – Casos de Testes Funcionais do Módulo de Autenticação e Perfil
- **Quadro 26** – Casos de Testes Funcionais da Configuração de Agenda e Catálogo
- **Quadro 27** – Casos de Testes Funcionais do Motor de Agendamento e Overbooking
- **Quadro 28** – Casos de Testes Funcionais do Sistema Assíncrono de Lembretes e SSE
- **Quadro 29** – Avaliação de Conformidade dos Requisitos Não Funcionais

---

## LISTA DE ABREVIATURAS E SIGLAS

- **ABNT** – Associação Brasileira de Normas Técnicas
- **API** – *Application Programming Interface* (Interface de Programação de Aplicações)
- **BaaS** – *Backend-as-a-Service*
- **BMC** – *Business Model Canvas*
- **Bcrypt** – Função criptográfica de derivação de chaves adaptativa
- **CEP** – Código de Endereçamento Postal
- **CNPJ** – Cadastro Nacional da Pessoa Jurídica
- **CPF** – Cadastro de Pessoas Físicas
- **CRUD** – *Create, Read, Update, Delete* (Criar, Ler, Atualizar e Excluir)
- **CSS** – *Cascading Style Sheets*
- **CSU** – Caso de Uso do Sistema
- **CTA** – *Call to Action* (Chamada para Ação)
- **DER** – Diagrama de Entidade-Relacionamento
- **DNS** – *Domain Name System*
- **DOM** – *Document Object Model*
- **DS** – Diagrama de Sequência
- **HTML** – *HyperText Markup Language*
- **HTTP** – *HyperText Transfer Protocol*
- **HTTPS** – *HyperText Transfer Protocol Secure*
- **IDE** – *Integrated Development Environment* (Ambiente de Desenvolvimento Integrado)
- **JSON** – *JavaScript Object Notation*
- **JWT** – *JSON Web Token*
- **MEI** – Microempreendedor Individual
- **MVC** – *Model-View-Controller*
- **NBR** – Norma Brasileira Regulamentadora
- **NoSQL** – *Not Only SQL* (Bancos de dados não relacionais)
- **ODM** – *Object Data Modeling* (Mapeador de Objetos para Bancos de Documentos)
- **PWA** – *Progressive Web Application*
- **REST** – *Representational State Transfer*
- **RF** – Requisito Funcional
- **RN** – Regra de Negócio
- **RNF** – Requisito Não Funcional
- **SaaS** – *Software as a Service* (Software como Serviço)
- **SEO** – *Search Engine Optimization*
- **SPA** – *Single Page Application*
- **SQL** – *Structured Query Language*
- **SSE** – *Server-Sent Events*
- **SSR** – *Server-Side Rendering*
- **TS** – TypeScript
- **UI** – *User Interface* (Interface do Usuário)
- **UML** – *Unified Modeling Language*
- **URI** – *Uniform Resource Identifier*
- **URL** – *Uniform Resource Locator*
- **UX** – *User Experience* (Experiência do Usuário)

---

## SUMÁRIO

- **1. INTRODUÇÃO**
  - 1.1 Contextualização e Motivação
  - 1.2 Problema de Pesquisa
  - 1.3 Objetivos
    - 1.3.1 Objetivo Geral
    - 1.3.2 Objetivos Específicos
  - 1.4 Justificativa
    - 1.4.1 Justificativa Social e Econômica
    - 1.4.2 Justificativa Técnica
  - 1.5 Estrutura do Trabalho
- **2. METODOLOGIA E TECNOLOGIAS APLICADAS**
  - 2.1 Metodologia de Desenvolvimento de Software
  - 2.2 Escopo do Projeto
  - 2.3 Ferramentas e Ambiente de Desenvolvimento
  - 2.4 Stack Tecnológica do Ecossistema Web
    - 2.4.1 Front-End e Framework Full-Stack: Nuxt 4, Vue.js 3 e Nuxt UI
    - 2.4.2 Back-End e Motor Nitro: TypeScript e Rotas de Servidor
    - 2.4.3 Arquitetura de Notificações em Tempo Real: Server-Sent Events (SSE)
    - 2.4.4 Processamento em Segundo Plano e Fila com Agenda.js
    - 2.4.5 Mensageria Transacional com Resend API
    - 2.4.6 Autenticação, Criptografia e Autorização (RBAC)
  - 2.5 Persistência de Dados Não Relacional (MongoDB e Mongoose)
    - 2.5.1 Justificativa do Modelo Orientado a Documentos
    - 2.5.2 Mapeamento e Integridade Estrutural com Mongoose
    - 2.5.3 Prevenção de Conflitos e Otimização via Índices Compostos
  - 2.6 Escalabilidade e Infraestrutura de Nuvem
- **3. REVISÃO DA LITERATURA E ANÁLISE DE SIMILARES**
  - 3.1 O Cenário do Empreendedorismo Feminino no Setor de Estética
  - 3.2 O Desafio da Gestão do Tempo e Barreiras Operacionais
  - 3.3 Análise Crítica de Aplicações Similares e o Conceito de Ambiente Modificável
- **4. PLANEJAMENTO DO SISTEMA BEAUTYHUB**
  - 4.1 Propósito e Declaração de Visão do Produto
  - 4.2 Perfis de Usuários (Atores do Ecossistema)
  - 4.3 Arquitetura de Informação e Modelo de Navegação
- **5. ENGENHARIA DE REQUISITOS E MODELAGEM DE SOFTWARE**
  - 5.1 Engenharia de Requisitos
    - 5.1.1 Requisitos Funcionais (RF)
    - 5.1.2 Requisitos Não Funcionais (RNF)
    - 5.1.3 Regras de Negócio do Sistema (RN)
  - 5.2 Especificações dos Casos de Uso
    - 5.2.1 Diagrama Geral de Casos de Uso (UML)
    - 5.2.2 Documentação dos Atores
  - 5.3 Catálogo Detalhado de Casos de Uso (CSU001 a CSU016)
  - 5.4 Diagrama de Classes de Domínio (UML)
  - 5.5 Diagramas de Sequência (UML)
    - 5.5.1 DS01 – Autenticação e Login de Usuário
    - 5.5.2 DS02 – Cadastro de Nova Empresa com Busca de CEP (ViaCEP)
    - 5.5.3 DS03 – Parametrização da Agenda e Pausas
    - 5.5.4 DS04 – Consulta Dinâmica de Horários Livres
    - 5.5.5 DS05 – Reserva de Horário e Agendamento de Job de Lembrete
    - 5.5.6 DS06 – Conclusão de Serviço e Notificação em Tempo Real (SSE)
    - 5.5.7 DS07 – Avaliação de Serviço Concluído
  - 5.6 Modelagem Estrutural de Dados NoSQL
- **6. PLANO DE TESTES FUNCIONAIS**
  - 6.1 Abordagem e Estratégia de Testes
  - 6.2 Testes de Fluxo de Usuário e Autenticação
  - 6.3 Testes de Operação e Catálogo da Empresa
  - 6.4 Testes do Algoritmo de Disponibilidade e Prevenção de Overbooking
  - 6.5 Testes de Processamento Assíncrono (Agenda.js, Resend e SSE)
  - 6.6 Testes de Requisitos Não Funcionais
- **7. INTERFACES DO SISTEMA BEAUTYHUB**
  - 7.1 Telas Públicas e de Acesso
  - 7.2 Área da Consumidora (Cliente)
  - 7.3 Área de Gestão da Profissional (Empresa/MEI)
  - 7.4 Painel de Governança (Administrador)
  - 7.5 Fundamentação Teórica de Usabilidade e UX/UI
- **8. PROCEDIMENTO DE IMPLANTAÇÃO E AMBIENTE DE EXECUÇÃO**
  - 8.1 Requisitos de Hardware e Software
  - 8.2 Variáveis de Ambiente e Configurações
  - 8.3 Execução em Ambiente de Desenvolvimento Local
  - 8.4 Estratégia de Deploy em Produção
- **9. LIMITAÇÕES E TRABALHOS FUTUROS**
  - 9.1 Limitações da Versão Atual
  - 9.2 Propostas de Evolução e Funcionalidades Futuras
- **10. CONSIDERAÇÕES FINAIS**
  - 10.1 Conclusão do Desenvolvimento
  - 10.2 Contribuições Acadêmicas e Sociais
- **11. APÊNDICES**
  - Apêndice A – Relação de Endpoints da API RESTful
  - Apêndice B – Código do Template de E-mail de Lembrete
  - Apêndice C – Business Model Canvas (BMC)
- **REFERÊNCIAS BIBLIOGRÁFICAS**

---

# 1. INTRODUÇÃO

## 1.1 Contextualização e Motivação

O advento da computação ubíqua, consolidada pela expansão acelerada dos dispositivos móveis e pela massificação do acesso à internet em alta velocidade, reconfigurou profundamente a prestação de serviços no Brasil e no mundo. Setores tradicionalmente operados de forma exclusivamente presencial e analógica foram compelidos a adotar ferramentas digitais para manter a competitividade, a eficiência operacional e o relacionamento contínuo com clientes.

Nesse panorama de transformação digital, o empreendedorismo feminino desponta como um dos motores mais expressivos da economia contemporânea. Dados do Serviço Brasileiro de Apoio às Micro e Pequenas Empresas (SEBRAE) indicam que mais de 10 milhões de mulheres comandam negócios no Brasil, com uma concentração expressiva nas atividades de serviços de beleza, cuidados pessoais e estética (como cabeleireiras, manicures, maquiadoras, designers de sobrancelhas e extensionistas de cílios). A esmagadora maioria dessas profissionais atua sob o regime jurídico de Microempreendedora Individual (MEI) ou como profissionais autônomas independentes.

Não obstante o expressivo faturamento e o volume ininterrupto de demanda por cuidados estéticos, a infraestrutura gerencial dessas microempreendedoras permanece amplamente rudimentar. É recorrente a constatação de profissionais que ainda utilizam agendas de papel físicas ou gerenciam centenas de mensagens simultâneas em aplicativos de mensageria instantânea (como o WhatsApp) para negociar e confirmar datas e horários. Essa prática fragmentada gera sobrecarga cognitiva severa, pois a profissional se vê forçada a interromper repetidamente procedimentos técnicos manuais de alta precisão para consultar disponibilidade, responder clientes e registrar reservas. O resultado direto dessa desorganização estrutural reflete-se em conflitos de agendamento (*overbooking*), esquecimentos de horários, ociosidade involuntária da agenda e ausência de previsibilidade de fluxo de caixa.

Diante de tais circunstâncias, plataformas de software comercialmente estabelecidas no mercado frequentemente falham em atender as particularidades desse nicho. Muitas impõem mensalidades fixas onerosas, exigem configurações corporativas complexas ou apresentam interfaces densas e pouco adaptadas a telas de smartphones, afastando profissionais autônomas que buscam agilidade sem fricção técnica. Constata-se, portanto, a necessidade urgente de desenvolver uma solução de software que integre a robustez da engenharia de sistemas contemporânea à simplicidade de um **ambiente modificável**, onde a própria profissional seja capaz de moldar o sistema às peculiaridades de sua rotina de trabalho.

## 1.2 Problema de Pesquisa

A partir do cenário identificado, formula-se o seguinte problema científico-tecnológico que norteia este trabalho:

> **Como conceber, modelar e implementar uma plataforma web de gestão e agendamento digital dotada de um ambiente modificável, capaz de automatizar o fluxo de marcações em tempo real, eliminar conflitos de horários e fortalecer a sustentabilidade operacional de microempreendedoras do setor de estética?**

## 1.3 Objetivos

### 1.3.1 Objetivo Geral

O objetivo geral deste trabalho consiste em projetar, desenvolver e validar a plataforma de software **BeautyHub**, um sistema web responsivo e adaptável, voltado à digitalização centralizada do processo de agendamento de serviços, gestão de catálogos estéticos e acompanhamento de rotina para profissionais autônomas e microempresas do segmento de beleza.

### 1.3.2 Objetivos Específicos

Para materializar o objetivo geral, foram traçados os seguintes objetivos específicos:

1. **Levantar e formalizar** os requisitos funcionais e não funcionais específicos do segmento de beleza, estabelecendo regras de negócio rigorosas para cálculo dinâmico de disponibilidade e bloqueio de reservas;
2. **Modelar a arquitetura da solução** utilizando notação padronizada da Unified Modeling Language (UML), contemplando diagramas de casos de uso com especificações formais, diagramas de classes de domínio e diagramas de sequência comportamentais;
3. **Projetar a estrutura de persistência de dados** em modelo NoSQL utilizando MongoDB e ODM Mongoose, projetando índices compostos específicos para prevenir ativamente conflitos de concorrência e *overbooking*;
4. **Construir interfaces de usuário responsivas (*Mobile-First*)** com base em componentes modernos, priorizando a usabilidade, acessibilidade e redução da carga cognitiva para clientes e gestoras;
5. **Desenvolver o ecossistema full-stack** sob o framework Nuxt 4 e linguagem TypeScript, aplicando o padrão de arquitetura em camadas e modularizando regras de negócio no back-end (Nitro Engine);
6. **Integrar serviços em tempo real e de segundo plano**, implementando fila de tarefas assíncronas com Agenda.js, notificações no navegador via Server-Sent Events (SSE) e disparo transacional de e-mails de lembrete com Resend API;
7. **Elaborar e executar um plano de testes funcionais sistemático**, validando os fluxos críticos de autenticação, agendamento concorrente, edição de catálogos e integridade dos dados persistidos.

## 1.4 Justificativa

### 1.4.1 Justificativa Social e Econômica

Sob a perspectiva socioeconômica, o fortalecimento de microempreendimentos geridos por mulheres atua como um vetor primordial de emancipação financeira e geração de renda nas comunidades urbanas. Quando uma manicure ou cabeleireira automatiza o atendimento e as reservas de horários de suas clientes, ela não apenas mitiga perdas decorrentes de faltas não avisadas (*no-shows*), mas também recupera horas produtivas diárias que anteriormente eram dissipadas em trocas de mensagens manuais. A previsibilidade de receita e a transparência propiciadas por um catálogo digital valorizam o trabalho da profissional, estimulando a formalização empresarial e a expansão sustentável de seus pequenos estabelecimentos.

### 1.4.2 Justificativa Técnica

Do ponto de vista da Ciência da Computação e da Engenharia de Software, o desenvolvimento do BeautyHub ancora-se em desafios contemporâneos de arquitetura web:
- **Computação Reativa e Concorrente:** A determinação de horários vagos não é uma simples busca em banco de dados; trata-se de um algoritmo que calcula a interseção entre o expediente configurado, as pausas intrajornada, os agendamentos previamente confirmados e a duração exata do procedimento pretendido, exigindo consistência transacional sob concorrência simultânea.
- **Ambiente Modificável:** O software não deve ser rígido. Ele precisa conceder a uma usuária leiga o controle total sobre a duração de serviços fracionados (ex.: 45 min, 90 min) e a inclusão ou exclusão de colaboradores, sem requerer intervenção de programadores ou migrações manuais de esquemas de dados.
- **Processamento Assíncrono Desacoplado:** A gestão de lembretes prévios (1 hora e 30 minutos antes de cada procedimento) demanda uma fila resiliente de tarefas em segundo plano (Agenda.js) que desonere o ciclo de requisição/resposta do usuário.

## 1.5 Estrutura do Trabalho

Este documento monográfico segue as diretrizes metodológicas da ABNT e organiza-se em 10 capítulos estruturados:
- **Capítulo 1 – Introdução:** Contextualização, problema, objetivos, justificativa e síntese estrutural.
- **Capítulo 2 – Metodologia e Tecnologias Aplicadas:** Processo metodológico ágil, escopo, arquitetura em camadas e stack completa (Nuxt 4, Vue 3, MongoDB, Mongoose, Agenda, SSE, Resend).
- **Capítulo 3 – Revisão da Literatura e Análise de Similares:** Fundamentação teórica do nicho de beleza, análise comparativa de soluções existentes de mercado e proposição do conceito de ambiente modificável.
- **Capítulo 4 – Planejamento do Sistema BeautyHub:** Propósito, especificação dos atores e mapeamento do modelo de navegação.
- **Capítulo 5 – Engenharia de Requisitos e Modelagem de Software:** Requisitos funcionais (RF), não funcionais (RNF), regras de negócio (RN), diagramas UML (casos de uso, classes, sequência) e especificações formais de casos de uso (CSU).
- **Capítulo 6 – Plano de Testes Funcionais:** Metodologia de testes, casos de teste com entradas, saídas esperadas e evidências de execução.
- **Capítulo 7 – Interfaces do Sistema BeautyHub:** Apresentação comentada das interfaces de cada módulo (público, cliente, empresa e administrador).
- **Capítulo 8 – Procedimento de Implantação e Ambiente de Execução:** Requisitos, variáveis de ambiente, execução local e estratégia de infraestrutura em nuvem.
- **Capítulo 9 – Limitações e Trabalhos Futuros:** Apontamentos sobre o estado atual do software e oportunidades de expansão funcional.
- **Capítulo 10 – Considerações Finais:** Síntese dos resultados acadêmicos e técnicos consolidados.
- **Apêndices e Referências Bibliográficas:** Complementos técnicos e citações normalizadas segundo a NBR 6023.

---

# 2. METODOLOGIA E TECNOLOGIAS APLICADAS

## 2.1 Metodologia de Desenvolvimento de Software

A condução do projeto BeautyHub fundamentou-se em práticas ágeis de desenvolvimento de software, com ênfase no método **Kanban** (ANDERSON, 2011). O Kanban viabiliza a gestão visual do fluxo de trabalho por meio de um quadro de cartões (*cards*) organizados em colunas dinâmicas (como *Backlog*, *Em Análise*, *Desenvolvimento*, *Code Review*, *Testes* e *Concluído*).

A escolha do Kanban justificou-se pela necessidade de responder rapidamente a refinamentos de requisitos identificados durante as interações com o público-alvo, limitando o trabalho em progresso (*Work In Progress* - WIP) para assegurar que cada funcionalidade fosse codificada, testada e integrada antes do início da subsequente. As reuniões de alinhamento entre os membros da equipe ocorreram semanalmente, apoiadas pelo versionamento contínuo em repositório Git hospedado na plataforma GitHub, mediante a estratégia de ramificação por funcionalidades (*Feature Branch Workflow*).

## 2.2 Escopo do Projeto

O escopo do sistema abrange a automação completa do ciclo de agendamentos no ramo estético, operando como um Software como Serviço (*SaaS*) focado em três frentes principais:
1. **Frente da Consumidora (Cliente):** Autoatendimento para localização de estabelecimentos, consulta de preços informativos e durações, reserva autônoma em horários disponíveis, visualização de histórico de agendamentos, cancelamentos dentro do prazo permitido e emissão de avaliações após o atendimento.
2. **Frente da Gestora (Empresa/MEI):** Parametrização completa do ambiente modificável (catálogo de serviços, horários de expediente, intervalos e colaboradores), visualização da agenda diária e controle de conclusão de procedimentos.
3. **Frente de Governança (Administrador):** Painel de controle global para acompanhamento de novos cadastros de empresas e clientes, métricas de adoção e gestão de status operacional de empresas na plataforma.

Delimita-se que a plataforma **não atua como intermediadora financeira**: as transações monetárias ocorrem presencialmente entre cliente e empresa (dinheiro, Pix ou cartões físicos), desonerando a microempreendedora de taxas de intermediação de pagamento.

## 2.3 Ferramentas e Ambiente de Desenvolvimento

Para a construção e sustentação do projeto, foram adotadas as seguintes ferramentas:
- **Figma:** Plataforma de prototipação em nuvem utilizada na elaboração dos wireframes e protótipos de alta fidelidade para as interfaces mobile e desktop, assegurando consistência em tipografia, cores e hierarquia visual (PM3, 2024);
- **Visual Studio Code (VS Code):** Ambiente de Desenvolvimento Integrado (IDE) configurado com extensões de TypeScript, ESLint, Prettier e suporte a componentes Vue/Nuxt;
- **Git e GitHub:** Controle de versões distribuído, permitindo rastreabilidade de código, resolução controlada de conflitos e histórico auditável de desenvolvimento;
- **Yarn (v1.22.22):** Gerenciador de pacotes de alta performance com resolução determinística de dependências via arquivo de bloqueio (*yarn.lock*).

## 2.4 Stack Tecnológica do Ecossistema Web

A Figura 1 ilustra a arquitetura lógica do sistema BeautyHub, estruturada sob uma rigorosa separação de responsabilidades em três camadas fundamentais: Camada de Apresentação (*Client-Side*), Camada de Aplicação e Serviços (*Server-Side / Nitro Engine*) e Camada de Persistência (*Database*).

```mermaid
graph TD
    subgraph Apresentacao ["1. Camada de Apresentação (Client-Side)"]
        UI["Vue 3 + Nuxt 4 (Components, Pages, Stores)"]
        Tailwind["Nuxt UI + Tailwind CSS (Design Tokens)"]
        SSE_Client["SSE Listener (EventSource Client)"]
    end

    subgraph Aplicacao ["2. Camada de Aplicação e Serviços (Server-Side)"]
        Nitro["Nitro Server Engine (TypeScript API Routes)"]
        AuthMiddleware["Middleware de Autenticação (JWT + Bcrypt)"]
        AlgoritmoAgenda["Motor de Cálculo de Horários e Anti-Overbooking"]
        AgendaWorker["Worker de Tarefas Assíncronas (Agenda.js)"]
        EmailService["Serviço de Mensageria (Resend API)"]
        SSEServer["Serviço de Push em Tempo Real (SSE)"]
    end

    subgraph Persistencia ["3. Camada de Persistência (Database)"]
        MongooseODM["Mongoose ODM (Schemas & Typed Models)"]
        MongoDB["Banco de Dados Não Relacional MongoDB Atlas"]
        AgendaCollection["Coleção de Jobs de Fila (Agenda Collection)"]
    end

    UI --> Nitro
    SSE_Client <.. SSEServer
    Nitro --> AuthMiddleware
    Nitro --> AlgoritmoAgenda
    Nitro --> MongooseODM
    AlgoritmoAgenda --> MongooseODM
    AlgoritmoAgenda --> AgendaWorker
    AgendaWorker --> EmailService
    AgendaWorker --> SSEServer
    AgendaWorker --> AgendaCollection
    MongooseODM --> MongoDB
```
*Figura 1 – Arquitetura Geral do Sistema BeautyHub em Camadas. Fonte: Elaborado pelos autores (2026).*

### 2.4.1 Front-End e Framework Full-Stack: Nuxt 4, Vue.js 3 e Nuxt UI

O front-end do BeautyHub foi construído utilizando o **Nuxt 4**, o mais moderno framework para o ecossistema **Vue.js 3**. O Nuxt proporciona recursos nativos essenciais para aplicações de alto nível:
- **Roteamento Baseado no Sistema de Arquivos (*File-Based Routing*):** Todas as páginas situadas no diretório `app/pages` convertem-se automaticamente em rotas tipadas, eliminando a manutenção manual de arquivos extensos de rotas;
- **Composição e Reatividade (Composition API):** Permite organizar a lógica de interface em módulos coesos e desacoplados através de *composables*, promovendo legibilidade e reuso de lógica;
- **Nuxt UI:** Biblioteca oficial de componentes construída sobre Tailwind CSS, que oferece acessibilidade integrada (WAI-ARIA), padronização tipográfica e suporte nativo a temas responsivos.

### 2.4.2 Back-End e Motor Nitro: TypeScript e Rotas de Servidor

O servidor do BeautyHub é executado pelo motor **Nitro**, o motor de servidor integrado do Nuxt. As rotas de API, localizadas no diretório `server/api/`, operam como funções sem servidor (*serverless endpoints*) puras, escritas integralmente em **TypeScript**. Esse arranjo elimina a necessidade de configurar servidores Express externos, garantindo que o front-end e o back-end compartilhem tipos de dados e contratos de interface de ponta a ponta.

### 2.4.3 Arquitetura de Notificações em Tempo Real: Server-Sent Events (SSE)

Para permitir que a usuária receba avisos imediatos em tela enquanto navega na plataforma (por exemplo, avisos de confirmação de agendamento ou alertas de proximidade do horário), implementou-se o protocolo **Server-Sent Events (SSE)** através da rota `server/api/notifications/stream.get.ts`. 

Diferente de requisições HTTP tradicionais que exigem consultas repetitivas em laço (*polling*), o SSE mantém uma conexão unidirecional persistente e de baixo consumo de recursos entre o servidor Nitro e o navegador, permitindo empurrar cargas JSON diretamente para a interface do cliente no exato instante em que o evento ocorre.

### 2.4.4 Processamento em Segundo Plano e Fila com Agenda.js

Para a execução de tarefas temporizadas de forma confiável, integrou-se a biblioteca **Agenda.js** (`agenda` e `@agendajs/mongo-backend`), configurada como plugin do Nitro em `server/plugins/agenda.ts`. 

O Agenda.js utiliza o próprio MongoDB como fila persistente de tarefas (*job queue*). No momento em que um agendamento é gerado no sistema, dois trabalhos futuros com a rotina `"enviar_lembrete"` são automaticamente agendados:
1. Um job para **1 hora** antes do início do procedimento;
2. Um job para **30 minutos** antes do início do procedimento.

Quando o cronômetro do banco atinge a data estipulada, o processo em segundo plano desperta, localiza os registros correspondentes e aciona concomitantemente a notificação SSE e o despacho do e-mail transacional.

### 2.4.5 Mensageria Transacional com Resend API

O canal externo de notificação do BeautyHub baseia-se na **Resend API**, uma infraestrutura em nuvem de entrega de e-mails corporativos. Por meio do utilitário `server/utils/emailTemplate.ts`, o sistema compõe layouts HTML limpos e informativos contendo o nome da cliente, o procedimento reservado, o nome da empresa, o horário formatado no fuso horário oficial de Brasília (`America/Sao_Paulo`) e orientações sobre comparecimento.

### 2.4.6 Autenticação, Criptografia e Autorização (RBAC)

A segurança e o controle de acesso são suportados pelo pacote `nuxt-auth-utils`, complementado por tokens criptografados **JSON Web Tokens (JWT)** e derivação de senhas com o algoritmo adaptativo **Bcrypt** (salting com 10 rounds). 

O sistema implementa o padrão **Controle de Acesso Baseado em Papéis** (*Role-Based Access Control* - RBAC), segmentando os usuários em três papéis:
- `admin`: Permissão total de governança sobre empresas e cadastros;
- `empresa`: Permissão restrita às configurações do próprio estabelecimento, catálogo, agenda e confirmação de serviços vinculados ao seu `id_empresa`;
- `cliente`: Permissão voltada à busca, reserva, cancelamento e histórico pessoal de agendamentos.

## 2.5 Persistência de Dados Não Relacional (MongoDB e Mongoose)

### 2.5.1 Justificativa do Modelo Orientado a Documentos

Optou-se pela utilização do banco de dados não relacional **MongoDB** hospedado em nuvem (**MongoDB Atlas**), integrado à aplicação através do ODM (Object Data Modeling) **Mongoose**.

Diferente de bancos de dados relacionais estritos com tabelas estáticas, o modelo orientado a documentos em formato BSON/JSON atende com exatidão à proposta de "ambiente modificável" do BeautyHub:
- As empresas de estética possuem variações intrínsecas: algumas operam de forma solo, outras possuem múltiplas funcionárias;
- Os horários de pausas intrajornada (almoço, descanso) possuem cardinalidade variável e podem ser expressos diretamente como subdocumentos aninhados (`pausas: [{ inicio: "12:00", fim: "13:00" }]`) sem a sobrecarga de tabelas intermediárias com junções (*joins*) onerosas;
- A evolução dos esquemas pode ocorrer sem demandar scripts complexos de migração que indisponibilizariam o serviço.

### 2.5.2 Mapeamento e Integridade Estrutural com Mongoose

Embora o MongoDB seja esquematicamente flexível, a confiabilidade de uma aplicação corporativa exige que regras de validação ocorram a nível de software. O Mongoose provê essa disciplina, garantindo validações de tamanho de caracteres, limites numéricos (`min`, `max`), expressões regulares para dias da semana e valores padrão obrigatórios antes de persistir os documentos.

### 2.5.3 Prevenção de Conflitos e Otimização via Índices Compostos

A garantia de que duas clientes não possam agendar o mesmo horário para a mesma profissional em simultâneo (conflito de concorrência / *overbooking*) é suportada por duas camadas de defesa:
1. **Validação Algorítmica na Aplicação:** Antes de confirmar a gravação, a rota `server/api/appointment/index.post.ts` consulta se existe qualquer agendamento com status `"aberto"` cujo intervalo colida com o período calculado (`[inicio, fim]`);
2. **Índice Composto no Banco de Dados:** Criou-se um índice específico no schema de agendamentos (`AppointmentSchema`):
   ```typescript
   AppointmentSchema.index(
     { id_empresa: 1, id_funcionario: 1, data_hora_inicio: 1, status: 1 },
     { name: "idx_overbooking" }
   );
   ```
   Esse índice assegura que consultas de conferência de sobreposição operem em tempo logarítmico $O(\log n)$, sem a realização de varreduras completas de coleção (*collection scans*).

## 2.6 Escalabilidade e Infraestrutura de Nuvem

A arquitetura do BeautyHub foi delineada para sustentação em nuvem (*cloud-native*):
- O front-end e os endpoints de API são compilados de forma otimizada para execução em plataformas com suporte a computação sem servidor (*serverless/edge*), tais como a **Vercel** ou instâncias conteinerizadas **Docker**;
- O banco de dados opera no cluster gerenciado MongoDB Atlas, que fornece redundância em três zonas de disponibilidade (*replica set*), backups contínuos automatizados e criptografia em repouso (*encryption at rest*);
- A execução do worker Agenda.js pode operar acoplada ao processo principal em instâncias pequenas ou ser facilmente extraída para um processo isolado de computação (*background dyno*) em cenários de alta volumetria transacional.

---

# 3. REVISÃO DA LITERATURA E ANÁLISE DE SIMILARES

## 3.1 O Cenário do Empreendedorismo Feminino no Setor de Estética

O empreendedorismo protagonizado por mulheres no Brasil tem se consolidado como uma das principais alavancas de inclusão produtiva e empoderamento social. Conforme dados sistematizados pelo Instituto Brasileiro de Geografia e Estatística (IBGE) e pelo SEBRAE (2024), o setor de serviços responde por mais de 50% dos negócios liderados por mulheres no país, com ampla predominância do segmento de Higiene, Beleza e Cuidados Pessoais.

Nesse setor, a relação de confiança entre a prestadora e a consumidora é historicamente estreita e personalizada. Serviços como extensão de cílios, design de sobrancelhas, harmonização facial básica e tratamentos capilares exigem concentração contínua e técnica apurada. Entretanto, muitas dessas profissionais acumulam isoladamente todas as responsabilidades do negócio: atendimento ao cliente, prestação do serviço físico, compras de insumos, divulgação em mídias sociais e conciliação financeira.

## 3.2 O Desafio da Gestão do Tempo e Barreiras Operacionais

De acordo com estudos clássicos sobre produtividade e administração do tempo em pequenas empresas (MAXIMIANO, 2017), a fragmentação da atenção (*context switching*) constitui o maior fator de perda de rendimento e geração de estresse em profissionais autônomos. Quando a manicure ou esteticista necessita interromper um atendimento em curso para responder a uma cliente pelo WhatsApp perguntando "Você tem horário para amanhã?", estabelece-se um ciclo vicioso de ineficiência:
1. O atendimento presencial sofre atrasos e perda de foco na experiência da cliente na cadeira;
2. A resposta remota pode demorar horas, fazendo com que a cliente em potencial procure outro estabelecimento concorrente;
3. A ausência de um repositório centralizado de dados faz com que horários vagos permaneçam desocupados (*janelas mortas*), comprometendo o faturamento no final do mês.

## 3.3 Análise Crítica de Aplicações Similares e o Conceito de Ambiente Modificável

A análise mercadológica de ferramentas de agendamento disponíveis revela dois polos de soluções:
1. **Sistemas Corporativos de Grande Porte (ex.: Avec, Trinks):** Softwares focados em grandes redes de salões de beleza e franquias. Embora completos, impõem mensalidades elevadas, exigem a aquisição compulsória de módulos complexos de emissão de notas fiscais e controle de comissões, além de apresentarem curvas de aprendizado íngremes que intimidam profissionais autônomas que trabalham individualmente;
2. **Agendas Genéricas e Formulários (ex.: Calendly, Google Agenda, WhatsApp Business):** Gratuitas ou de baixo custo, porém genéricas. Não compreendem a dinâmica estética — como durações diferenciadas por tipo de serviço, bloqueio de pausas de almoço ou a necessidade de exibir fotos de antes e depois dos procedimentos em uma vitrine virtual.

O diferencial do **BeautyHub** repousa exatamente no **Ambiente Modificável**. Trata-se de uma aplicação pensada na linguagem e na rotina da profissional MEI: o sistema adapta-se à escala do negócio. Se a profissional atua sozinha, a plataforma comporta-se como uma agenda direta e limpa; caso passe a atender com funcionárias parceiras, o sistema habilita dinamicamente a segregação de escalas, mantendo a experiência simples, funcional e centrada no usuário.

---

# 4. PLANEJAMENTO DO SISTEMA BEAUTYHUB

## 4.1 Propósito e Declaração de Visão do Produto

O propósito fundamental do BeautyHub é democratizar a gestão digital para o setor de beleza, oferecendo uma ponte tecnológica fluida entre profissionais e clientes:

> **Declaração de Visão:** "Para profissionais autônomas e pequenas gestoras do setor de estética que lutam contra o caos do agendamento manual e a sobrecarga de mensagens, o **BeautyHub** é uma plataforma web responsiva de autosserviço e gestão com ambiente modificável que centraliza a exposição de serviços, automatiza a reserva de horários em tempo real e emite lembretes preventivos de atendimento. Diferente de plataformas genéricas ou caras, o BeautyHub entrega flexibilidade imediata sem exigir conhecimentos técnicos prévios, fomentando a autonomia e a sustentabilidade financeira feminina."

## 4.2 Perfis de Usuários (Atores do Ecossistema)

A plataforma modela três atores humanos e um ator de sistema:
- **Cliente:** A consumidora que busca por cuidados estéticos. Utiliza dispositivos móveis para descobrir estabelecimentos, conferir valores informativos e agendar horários em qualquer momento do dia (inclusive fora do expediente comercial);
- **Empresa (MEI):** A profissional autônoma ou proprietária do estabelecimento estético. Detém a governança de sua página, definindo sua identidade visual, seu portfólio de serviços com durações específicas, suas regras de expediente e a homologação dos atendimentos diários;
- **Administrador:** Mantenedor técnico da plataforma com visão consolidada dos números de uso, responsável por autorizar a entrada de empresas e resguardar as regras de convivência sistêmica;
- **Sistema (Back-end / Fila Agenda):** Ator autônomo em segundo plano que monitora prazos, despacha e-mails transacionais e sincroniza mensagens de alerta via SSE.

## 4.3 Arquitetura de Informação e Modelo de Navegação

A Figura 2 apresenta o modelo de navegação do BeautyHub. O usuário inicia sua jornada pela Landing Page pública. A partir da autenticação, o mecanismo de roteamento baseado em permissões (*RBAC*) conduz o usuário para sua área de trabalho especializada:

```mermaid
graph TD
    Home["Tela Inicial (Landing Page)"] -->|Navegar| Login["Tela de Autenticação / Login"]
    Home -->|Navegar| Cadastro["Tela de Cadastro (Cliente / Empresa)"]
    Home -->|Explorar| BuscaPublica["Busca de Serviços e Salões"]

    Login -->|Sucesso Auth| Roteador{Qual o Perfil?}

    Roteador -->|Role: Cliente| AreaCliente["Área da Cliente"]
    AreaCliente --> Busca["Busca e Filtro de Serviços"]
    Busca --> DetalheEmpresa["Página da Empresa & Catálogo"]
    DetalheEmpresa --> ModalAgendamento["Seleção de Horário & Reserva"]
    AreaCliente --> HistoricoCliente["Histórico de Agendamentos"]
    HistoricoCliente --> ModalAvaliacao["Avaliar Atendimento"]
    HistoricoCliente --> Cancelamento["Cancelar Agendamento"]
    AreaCliente --> PerfilCliente["Editar Dados Pessoais"]

    Roteador -->|Role: Empresa| AreaEmpresa["Área da Empresa"]
    AreaEmpresa --> DashboardEmpresa["Dashboard Diário de Agendamentos"]
    DashboardEmpresa --> AcaoStatus["Concluir / Cancelar Atendimento"]
    AreaEmpresa --> CatalogoEmpresa["Gestão de Serviços (CRUD)"]
    AreaEmpresa --> AgendaConfig["Configuração de Jornada & Pausas"]
    AreaEmpresa --> EquipeEmpresa["Gestão de Equipe de Funcionárias"]
    AreaEmpresa --> PerfilEmpresa["Perfil do Estabelecimento & Endereço"]

    Roteador -->|Role: Admin| AreaAdmin["Painel Administrativo"]
    AreaAdmin --> DashAdmin["Métricas Globais do Sistema"]
    AreaAdmin --> GestaoEmpresas["Auditoria e Ativação de Empresas"]
```
*Figura 2 – Modelo de Navegação Global do Sistema BeautyHub. Fonte: Elaborado pelos autores (2026).*

---

# 5. ENGENHARIA DE REQUISITOS E MODELAGEM DE SOFTWARE

## 5.1 Engenharia de Requisitos

A especificação de requisitos representa o alicerce fundamental para a garantia de qualidade e conformidade de um artefato de software. Conforme destaca Sommerville (2018, p. 104), *"a especificação de requisitos é o processo de escrever os requisitos de usuário e de sistema em um documento de requisitos. Em condições ideais, esses requisitos devem ser claros, inequívocos, fáceis de entender, completos e consistentes"*.

### 5.1.1 Requisitos Funcionais (RF)

O Quadro 1 descreve formalmente os Requisitos Funcionais identificados e implementados na solução BeautyHub.

**Quadro 1 – Requisitos Funcionais do Sistema BeautyHub**

| ID | Descrição do Requisito Funcional | Caso de Uso Relacionado | Regra de Negócio |
| :--- | :--- | :--- | :--- |
| **RF001** | O sistema deve permitir o cadastro de novos clientes, validando nome, e-mail único e senha criptografada. | CSU001 | RN01 |
| **RF002** | O sistema deve autenticar usuários (clientes, empresas e admin) via e-mail e senha, retornando sessão segura JWT. | CSU002 | RN03 |
| **RF003** | O sistema deve disponibilizar funcionalidade de recuperação de senha por e-mail com tokens de expiração curta. | CSU003 | RN03 |
| **RF004** | O sistema deve exibir painel de controle administrativo com métricas globais (total de empresas, clientes e agendamentos). | CSU004 | - |
| **RF005** | O sistema deve permitir o cadastro de empresas/profissionais, validando dados cadastrais, contato, categoria e endereço integrado via CEP. | CSU005 | RN01 |
| **RF006** | O sistema deve permitir que o administrador ative ou suspenda contas de estabelecimentos cadastrados. | CSU006 | RN02 |
| **RF007** | O sistema deve permitir que a empresa mantenha seu catálogo de serviços (criar, listar, editar, inativar), informando nome, valor e duração em minutos. | CSU007 | RN02 |
| **RF008** | O sistema deve permitir que a empresa configure os dias de atendimento da semana, horários de abertura e fechamento, e pausas de almoço/descanso. | CSU008 | RN05 |
| **RF009** | O sistema deve permitir que a empresa cadastre sua equipe de funcionárias com jornadas e pausas individualizadas. | CSU009 | RN05 |
| **RF010** | O sistema deve apresentar à gestora da empresa a visualização da agenda diária, agrupando as reservas confirmadas por data. | CSU010 | - |
| **RF011** | O sistema deve permitir que a empresa atualize manualmente o status de um agendamento para "Concluído" ou "Cancelado". | CSU011 | RN07 |
| **RF012** | O sistema deve permitir a busca pública de serviços e estabelecimentos com filtros por nome, localidade e categoria estética. | CSU012 | RN02 |
| **RF013** | O sistema deve calcular dinamicamente os blocos de horários livres, subtraindo pausas e agendamentos existentes, prevenindo conflitos (*overbooking*). | CSU013 | RN04, RN05 |
| **RF014** | O sistema deve permitir que a cliente autenticada confirme a reserva de um serviço, disparando o agendamento de lembretes automáticos. | CSU013 | RN03, RN04 |
| **RF015** | O sistema deve permitir que a cliente cancele um agendamento ativo, respeitando o prazo mínimo de antecedência de 2 horas. | CSU015 | RN06 |
| **RF016** | O sistema deve permitir que a cliente avalie com nota (estrelas) e comentário um atendimento marcado como "Concluído", limitando a uma avaliação por reserva. | CSU016 | RN08, RN09 |

*Fonte: Elaborado pelos autores (2026).*

### 5.1.2 Requisitos Não Funcionais (RNF)

O Quadro 2 estabelece os parâmetros de qualidade, restrições arquiteturais e diretrizes de confiabilidade e segurança que regem o BeautyHub.

**Quadro 2 – Requisitos Não Funcionais do Sistema BeautyHub**

| ID | Categoria | Descrição do Requisito Não Funcional | Critério de Aceite / Métrica |
| :--- | :--- | :--- | :--- |
| **RNF001** | Arquitetura | O sistema deve ser estruturado em arquitetura em camadas clara (Apresentação, Serviços de Negócio e Persistência de Dados). | Código desacoplado em pastas `app/`, `server/api/` e `server/models/`. |
| **RNF002** | Usabilidade | A interface deve aderir integralmente ao paradigma *Mobile-First*, com layout responsivo para smartphones e desktops. | Adaptação em telas de 360px a 1920px sem quebras de layout ou sobreposição de componentes. |
| **RNF003** | Segurança | As credenciais de acesso (senhas) devem ser criptografadas com hash adaptativo antes da persistência. | Emprego obrigatório da biblioteca Bcrypt com no mínimo 10 salt rounds. |
| **RNF004** | Desempenho | O endpoint de cálculo dinâmico de disponibilidade de horários deve responder com agilidade. | Tempo de resposta menor que 800 milissegundos para 95% das requisições (*P95*). |
| **RNF005** | Integridade | A camada de persistência deve utilizar banco NoSQL com tipagem estrita de schemas e índices de unicidade. | Schemas Mongoose tipados com TypeScript e índice composto `idx_overbooking`. |
| **RNF006** | Confiabilidade | O envio de lembretes de agendamento não deve depender de requisições ativas de clientes. | Fila persistente de jobs em segundo plano com Agenda.js e tolerância a reinicializações. |
| **RNF007** | Interoperabilidade | O sistema deve consumir serviço externo de consulta de CEPs para preenchimento ágil de endereços. | Integração síncrona com a API pública ViaCEP retornando dados em JSON. |
| **RNF008** | Autenticação | A comunicação entre cliente e servidor deve ser protegida por tokens assinados criptograficamente. | Utilização de JSON Web Tokens (JWT) trafegados em cookies seguros HTTP-Only. |
| **RNF009** | Reatividade | Atualizações críticas de status devem ser transmitidas em tempo real para navegadores abertos. | Transmissão de eventos via protocolo Server-Sent Events (SSE). |
| **RNF010** | Portabilidade | A aplicação deve ser plenamente executável em navegadores modernos sem necessidade de plugins proprietários. | Suporte comprovado a Google Chrome, Safari, Firefox e Microsoft Edge. |

*Fonte: Elaborado pelos autores (2026).*

### 5.1.3 Regras de Negócio do Sistema (RN)

O Quadro 3 sintetiza as regras e diretrizes normativas que condicionam os processos transacionais do sistema.

**Quadro 3 – Regras de Negócio do Sistema BeautyHub**

| ID | Título da Regra | Descrição e Condicionamento Lógico |
| :--- | :--- | :--- |
| **RN01** | Unicidade de Cadastro | O e-mail informado no cadastro de usuários e empresas deve ser único em toda a base de dados. O documento fiscal (CPF/CNPJ) informado pela empresa também não pode constar em múltiplos registros. |
| **RN02** | Visibilidade em Buscas | Uma empresa cadastrada só se torna visível nas buscas públicas para clientes se o seu status for "ativo" e possuir, no mínimo, um serviço cadastrado no catálogo. |
| **RN03** | Exigência de Autenticação | Visitantes anônimos podem buscar serviços e visualizar perfis de salões. Contudo, a efetivação de uma reserva de horário exige que o usuário esteja devidamente autenticado como cliente. |
| **RN04** | Prevenção de *Overbooking* | Sob nenhuma condição o sistema permitirá o agendamento de dois procedimentos simultâneos para a mesma funcionária (ou mesma empresa solo) no mesmo intervalo de tempo. |
| **RN05** | Cálculo Dinâmico de Slots | O cálculo dos blocos de horários livres considera: (Expediente) - (Pausas Intrajornada) - (Agendamentos em Aberto). O bloco livre precisa comportar integralmente a duração em minutos do procedimento. |
| **RN06** | Prazo Mínimo de Cancelamento | A cliente só poderá cancelar um agendamento diretamente pela plataforma se o horário de início distar, no mínimo, 2 horas do momento da solicitação. |
| **RN07** | Transição de Status da Reserva | Um agendamento é criado com status "aberto". Apenas a empresa prestadora pode alterar o status para "concluído". O cancelamento pode ser acionado pela empresa ou pela cliente (respeitando a RN06). |
| **RN08** | Elegibilidade de Avaliação | A cliente só tem permissão para submeter uma avaliação com estrelas e comentário se o agendamento correspondente estiver com status "concluído". |
| **RN09** | Avaliação Estritamente Única | Cada agendamento concluído autoriza a realização de exatamente uma avaliação (`avaliado: true`), impedindo duplicação de notas pelo mesmo serviço prestado. |
| **RN10** | Pagamento Presencial | A plataforma BeautyHub gerencia exclusivamente a agenda e a vitrine; a cobrança monetária do valor do serviço ocorre diretamente entre cliente e profissional no local de atendimento. |

*Fonte: Elaborado pelos autores (2026).*

## 5.2 Especificações dos Casos de Uso

### 5.2.1 Diagrama Geral de Casos de Uso (UML)

A Figura 3 demonstra o Diagrama de Casos de Uso do BeautyHub, ilustrando a fronteira da aplicação e os relacionamentos de inclusão (`<<include>>`) e extensão (`<<extend>>`) entre os casos de uso e os atores do ecossistema.

```mermaid
graph LR
    subgraph Atores
        Cliente((Cliente))
        Empresa((Empresa / MEI))
        Admin((Administrador))
        Sistema((Sistema / Worker))
    end

    subgraph Fronteira ["Plataforma BeautyHub"]
        UC01["CSU001: Cadastrar Cliente"]
        UC02["CSU002: Efetuar Login"]
        UC03["CSU003: Recuperar Senha"]
        UC04["CSU004: Visualizar Dashboard Admin"]
        UC05["CSU005: Cadastrar Empresa"]
        UC06["CSU006: Manter Status da Empresa"]
        UC07["CSU007: Manter Catálogo de Serviços"]
        UC08["CSU008: Configurar Agenda e Pausas"]
        UC09["CSU009: Gerenciar Equipe de Funcionárias"]
        UC010["CSU010: Visualizar Agenda do Dia"]
        UC011["CSU011: Atualizar Status do Atendimento"]
        UC012["CSU012: Buscar Empresas e Serviços"]
        UC013["CSU013: Consultar Slots e Agendar"]
        UC014["CSU014: Visualizar Histórico de Reservas"]
        UC015["CSU015: Cancelar Agendamento"]
        UC016["CSU016: Avaliar Atendimento Concluído"]
        UC_Job["Rotina Automática de Envio de Lembretes"]
    end

    Cliente --> UC01
    Cliente --> UC02
    Cliente --> UC03
    Cliente --> UC012
    Cliente --> UC013
    Cliente --> UC014
    Cliente --> UC015
    Cliente --> UC016

    Empresa --> UC02
    Empresa --> UC05
    Empresa --> UC07
    Empresa --> UC08
    Empresa --> UC09
    Empresa --> UC010
    Empresa --> UC011

    Admin --> UC02
    Admin --> UC04
    Admin --> UC06

    Sistema --> UC_Job

    UC013 -.->|<<include>>| UC02
    UC016 -.->|<<extend>>| UC014
    UC015 -.->|<<extend>>| UC014
    UC_Job -.->|<<include>>| UC013
```
*Figura 3 – Diagrama Geral de Casos de Uso (UML). Fonte: Elaborado pelos autores (2026).*

### 5.2.2 Documentação dos Atores

Os Quadros 4 a 7 detalham os perfis de atores humanos e de sistema que interagem com o BeautyHub.

**Quadro 4 – Documentação do Ator: Usuário Geral**

| Campo | Descrição |
| :--- | :--- |
| **Ator** | Usuário Geral (Superclasse Abstrata) |
| **Resumo** | Representa qualquer indivíduo que acesse a aplicação web pelo navegador, com permissão para visualizar páginas públicas e autenticar-se. |
| **Responsabilidades** | 1. Navegar pela Landing Page e termos de uso;<br>2. Realizar busca pública por estabelecimentos e procedimentos estéticos;<br>3. Informar credenciais para autenticação no sistema. |
| **Ambiente Físico** | Navegadores web em dispositivos móveis (*smartphones*, *tablets*) ou computadores desktop com acesso à internet. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 5 – Documentação do Ator: Administrador**

| Campo | Descrição |
| :--- | :--- |
| **Ator** | Administrador |
| **Resumo** | Ator responsável pela supervisão técnica, integridade e governança da plataforma BeautyHub. |
| **Responsabilidades** | 1. Monitorar o crescimento e adesão do sistema através do dashboard analítico;<br>2. Auditar estabelecimentos cadastrados;<br>3. Suspender ou reativar empresas que descumpram termos de uso. |
| **Ambiente Físico** | Navegador web em computadores desktop ou notebooks. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 6 – Documentação do Ator: Empresa (MEI / Gestora)**

| Campo | Descrição |
| :--- | :--- |
| **Ator** | Empresa (MEI / Gestora de Estética) |
| **Resumo** | Profissional autônoma ou proprietária de estabelecimento de beleza que utiliza o ambiente modificável para estruturar seu negócio. |
| **Responsabilidades** | 1. Cadastrar e manter os dados institucionais e endereço do salão;<br>2. Gerenciar o catálogo de procedimentos, valores e durações;<br>3. Parametrizar a jornada semanal, horários de expediente e pausas de almoço;<br>4. Cadastrar e vincular colaboradoras/funcionárias;<br>5. Acompanhar a agenda diária e registrar a conclusão dos atendimentos. |
| **Ambiente Físico** | Navegador web em smartphones ou computadores do estabelecimento. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 7 – Documentação do Ator: Cliente (Consumidora Final)**

| Campo | Descrição |
| :--- | :--- |
| **Ator** | Cliente (Consumidora Final) |
| **Resumo** | Usuária que busca comodidade e praticidade para encontrar serviços estéticos e agendar horários de forma independente. |
| **Responsabilidades** | 1. Cadastrar seu perfil pessoal;<br>2. Localizar salões por proximidade, serviço ou categoria estética;<br>3. Escolher data, serviço e profissional, confirmando a reserva do horário vago;<br>4. Gerenciar histórico de reservas ativas e efetuar cancelamentos antecipados;<br>5. Submeter avaliações e notas para atendimentos concluídos. |
| **Ambiente Físico** | Principalmente navegadores móveis em smartphones. |

*Fonte: Elaborado pelos autores (2026).*

## 5.3 Catálogo Detalhado de Casos de Uso (CSU001 a CSU016)

Os Quadros 8 a 23 formalizam o catálogo completo de casos de uso do BeautyHub segundo as melhores práticas de Engenharia de Software.

**Quadro 8 – Especificação de Caso de Uso CSU001: Cadastrar Cliente**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU001: Cadastrar Cliente** |
| **Resumo** | Permite que uma nova consumidora crie uma conta na plataforma para realizar agendamentos. |
| **Atores** | Cliente (Primário), Banco de Dados MongoDB (Secundário). |
| **Pré-condições** | Possuir um endereço de e-mail válido que ainda não esteja registrado na plataforma. |
| **Fluxo Principal** | 1. O usuário acessa a página de cadastro e seleciona a opção "Sou Cliente";<br>2. O sistema exibe o formulário solicitando nome completo, e-mail e senha;<br>3. O usuário preenche os campos e clica no botão "Criar Conta";<br>4. O sistema valida os campos, aplica o hash Bcrypt na senha e grava o documento na coleção de usuários com o papel `cliente`;<br>5. O sistema emite a sessão JWT em cookie seguro e redireciona a cliente para a tela de busca de serviços. |
| **Pós-condições** | A conta é criada e a cliente encontra-se autenticada no sistema. |
| **Fluxos Alternativos** | **FA01 - Cadastro via Conta Google:** No passo 2, a cliente opta por "Cadastrar com Google", autentica-se externamente via OAuth e o sistema salva o registro associando o `googleId`. |
| **Fluxos de Exceção** | **FE01 - E-mail já cadastrado:** Caso o e-mail já exista na base, o sistema exibe alerta informando a duplicidade e orienta a usuária a efetuar login. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 9 – Especificação de Caso de Uso CSU002: Efetuar Login**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU002: Efetuar Login** |
| **Resumo** | Autentica as credenciais do usuário e concede acesso às funcionalidades pertinentes ao seu perfil. |
| **Atores** | Usuário (Primário), Banco de Dados MongoDB (Secundário). |
| **Pré-condições** | Usuário previamente cadastrado na plataforma. |
| **Fluxo Principal** | 1. O usuário acessa a tela de autenticação;<br>2. O usuário informa seu e-mail e sua senha de acesso e clica em "Entrar";<br>3. O sistema localiza o usuário pelo e-mail e compara a senha informada com o hash armazenado via `bcrypt.compare`;<br>4. O sistema gera um token JWT contendo os dados básicos e o papel (`role`) do usuário;<br>5. O sistema grava o token em cookie seguro e redireciona o usuário para o módulo correspondente (Admin, Empresa ou Cliente). |
| **Pós-condições** | Sessão segura estabelecida. |
| **Fluxos Alternativos** | **FA01 - Redirecionamento Contextual:** Se o usuário tentou agendar antes de estar logado, o sistema o devolve diretamente ao fluxo de finalização do agendamento. |
| **Fluxos de Exceção** | **FE01 - Credenciais Inválidas:** Se o e-mail não existir ou a senha estiver incorreta, o sistema exibe mensagem de erro e permanece na tela de login. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 10 – Especificação de Caso de Uso CSU003: Recuperar Senha**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU003: Recuperar Senha** |
| **Resumo** | Permite a redefinição de senha para usuários que esqueceram suas credenciais. |
| **Atores** | Usuário (Primário), Serviço de E-mail Resend (Secundário). |
| **Pré-condições** | Ter um e-mail previamente registrado no sistema. |
| **Fluxo Principal** | 1. O usuário clica em "Esqueci minha senha" na tela de login;<br>2. O sistema solicita a inserção do e-mail cadastrado;<br>3. O usuário digita o e-mail e clica em "Enviar link de recuperação";<br>4. O sistema gera um token assinado de expiração curta (15 minutos) e envia por e-mail com template seguro;<br>5. O usuário acessa o link recebido, digita a nova senha e confirma;<br>6. O sistema atualiza o hash da senha no banco de dados e confirma a alteração. |
| **Pós-condições** | Nova senha registrada com segurança. |
| **Fluxos de Exceção** | **FE01 - E-mail não encontrado:** O sistema exibe mensagem amigável sem revelar detalhes sensíveis sobre a existência do e-mail na base de dados. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 11 – Especificação de Caso de Uso CSU004: Visualizar Dashboard Administrativo**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU004: Visualizar Dashboard Administrativo** |
| **Resumo** | Apresenta os indicadores de gestão e métricas agregadas da plataforma ao Administrador. |
| **Atores** | Administrador (Primário), Banco de Dados MongoDB (Secundário). |
| **Pré-condições** | Estar autenticado com o papel `admin`. |
| **Fluxo Principal** | 1. O administrador acessa a rota `/Admin`;<br>2. O middleware de servidor valida o papel `admin` no token JWT;<br>3. O sistema calcula a contagem total de empresas cadastradas, clientes registrados e volume de agendamentos transacionados;<br>4. A tela exibe os cartões com indicadores e a listagem consolidada de estabelecimentos. |
| **Pós-condições** | Métricas exibidas sem alteração de estado no banco. |
| **Fluxos de Exceção** | **FE01 - Acesso Não Autorizado:** Caso um usuário sem privilégios tente acessar, o sistema retorna HTTP 403 (Forbidden) e redireciona para a página inicial. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 12 – Especificação de Caso de Uso CSU005: Cadastrar Empresa**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU005: Cadastrar Empresa** |
| **Resumo** | Realiza o onboarding de novos estabelecimentos e profissionais de beleza na plataforma. |
| **Atores** | Empresa/Gestora (Primário), API ViaCEP (Secundário), MongoDB (Secundário). |
| **Pré-condições** | Possuir e-mail e CNPJ/CPF não registrados anteriormente. |
| **Fluxo Principal** | 1. O usuário acessa o cadastro e seleciona "Sou Empresa / Profissional";<br>2. O usuário informa dados cadastrais (nome da empresa, e-mail comercial, telefone, categoria estética e descrição);<br>3. O usuário digita o CEP de atendimento e o sistema consulta a API ViaCEP, autopreenchendo logradouro, bairro, cidade e estado;<br>4. O usuário complementa o número predial e a senha de acesso;<br>5. O sistema grava o usuário com o papel `empresa` e cria o registro na coleção `Enterprise` com status inicial "ativo";<br>6. O sistema inicializa uma configuração padrão de agenda (`AgendaConfig`) e redireciona a gestora para seu painel. |
| **Pós-condições** | Empresa registrada e apta a configurar seus serviços e jornadas. |
| **Fluxos de Exceção** | **FE01 - CEP não localizado:** O sistema permite a digitação manual dos campos de endereço caso a API do ViaCEP retorne código de erro. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 13 – Especificação de Caso de Uso CSU006: Manter Status da Empresa**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU006: Manter Status da Empresa** |
| **Resumo** | Permite ao Administrador suspender temporariamente ou reativar estabelecimentos. |
| **Atores** | Administrador (Primário), MongoDB (Secundário). |
| **Pré-condições** | Administrador logado e empresa existente na base. |
| **Fluxo Principal** | 1. O administrador acessa a lista de empresas no painel administrativo;<br>2. Localiza a empresa desejada e aciona o botão de alternância de status ("Ativar" / "Suspender");<br>3. O sistema atualiza o campo `status_empresa` para "inativo" ou "ativo" no banco de dados;<br>4. Se suspensa, a empresa é imediatamente omitida das consultas públicas de busca de serviços. |
| **Pós-condições** | Status da empresa atualizado com sucesso. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 14 – Especificação de Caso de Uso CSU007: Manter Catálogo de Serviços**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU007: Manter Catálogo de Serviços** |
| **Resumo** | Permite à gestora cadastrar, editar, inativar e definir durações e preços de seus procedimentos. |
| **Atores** | Empresa/Gestora (Primário), MongoDB (Secundário). |
| **Pré-condições** | Usuário autenticado como empresa. |
| **Fluxo Principal** | 1. A gestora acessa o módulo "Catálogo de Serviços" em seu painel;<br>2. O sistema lista os procedimentos atualmente cadastrados;<br>3. A gestora clica em "Adicionar Serviço" e preenche: título do procedimento, descrição, preço de tabela e tempo estimado de execução (ex.: 30, 45, 60, 90 minutos);<br>4. Clica em "Salvar Procedimento";<br>5. O sistema grava o documento na coleção `Service` vinculado ao `id_empresa` da gestora. |
| **Pós-condições** | O catálogo é atualizado e os novos parâmetros passam a alimentar o motor de agendamentos. |
| **Fluxos Alternativos** | **FA01 - Inativação Temporária:** A gestora altera o campo `ativo` para falso caso não deseje ofertar o serviço momentaneamente, preservando o histórico anterior. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 15 – Especificação de Caso de Uso CSU008: Configurar Agenda de Atendimento**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU008: Configurar Agenda de Atendimento** |
| **Resumo** | Parametriza a jornada de funcionamento da empresa, dias da semana e pausas intrajornada. |
| **Atores** | Empresa/Gestora (Primário), MongoDB (Secundário). |
| **Pré-condições** | Usuário autenticado como empresa. |
| **Fluxo Principal** | 1. A gestora acessa a página "Configurações da Agenda";<br>2. Seleciona os dias da semana em que atende (ex.: Terça a Sábado);<br>3. Define os horários de início e término do expediente geral (ex.: 09:00 às 18:00);<br>4. Adiciona intervalos regulares de pausas (ex.: pausa de almoço das 12:00 às 13:00);<br>5. Aciona o comando "Gravar Configurações";<br>6. O sistema atualiza o documento na coleção `AgendaConfig`. |
| **Pós-condições** | O motor de agendamento passa a respeitar as novas regras de disponibilidade. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 16 – Especificação de Caso de Uso CSU009: Gerenciar Equipe de Funcionárias**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU009: Gerenciar Equipe de Funcionárias** |
| **Resumo** | Permite o cadastro e gestão de colaboradoras com escalas de trabalho individuais. |
| **Atores** | Empresa/Gestora (Primário), MongoDB (Secundário). |
| **Pré-condições** | Usuário autenticado como empresa. |
| **Fluxo Principal** | 1. A gestora acessa o módulo "Equipe" no painel da empresa;<br>2. Clica em "Cadastrar Colaboradora" e informa: nome, idade, foto e escala personalizada de dias e horários;<br>3. Grava o registro;<br>4. O sistema cria o documento na coleção `Employee` associado à empresa;<br>5. O sistema passa a permitir que as clientes escolham a profissional específica durante o agendamento. |
| **Pós-condições** | Colaboradora disponível para reservas simultâneas na empresa. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 17 – Especificação de Caso de Uso CSU010: Visualizar Agenda Diária da Empresa**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU010: Visualizar Agenda Diária da Empresa** |
| **Resumo** | Exibe à gestora o cronograma visual de atendimentos confirmados para o dia selecionado. |
| **Atores** | Empresa/Gestora (Primário), MongoDB (Secundário). |
| **Pré-condições** | Usuário autenticado como empresa. |
| **Fluxo Principal** | 1. A gestora acessa o Dashboard da Empresa;<br>2. O sistema consulta os agendamentos registrados para a data de hoje onde `id_empresa` corresponda à empresa logada;<br>3. Os agendamentos são apresentados em ordem cronológica com nome da cliente, serviço, profissional designada, horário e status ("aberto", "concluído", "cancelado"). |
| **Pós-condições** | Agenda exibida de forma clara e visual. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 18 – Especificação de Caso de Uso CSU011: Atualizar Status do Atendimento**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU011: Atualizar Status do Atendimento** |
| **Resumo** | Permite que a empresa marque um agendamento como "Concluído" ou registre cancelamento. |
| **Atores** | Empresa/Gestora (Primário), Servidor SSE (Secundário), MongoDB (Secundário). |
| **Pré-condições** | Agendamento existente com status "aberto". |
| **Fluxo Principal** | 1. No dashboard diário, a gestora identifica o atendimento recém-finalizado;<br>2. Clica no botão "Marcar como Concluído";<br>3. O sistema atualiza o status para `concluido` na coleção `Appointment`;<br>4. O sistema emite um evento SSE informando à interface da cliente que o procedimento foi finalizado;<br>5. A plataforma da cliente desbloqueia a opção para que ela avalie o serviço. |
| **Pós-condições** | Agendamento concluído e gatilho de avaliação ativado. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 19 – Especificação de Caso de Uso CSU012: Buscar Empresas e Serviços**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU012: Buscar Empresas e Serviços** |
| **Resumo** | Permite a pesquisa e filtragem de estabelecimentos de beleza por categoria estética ou localidade. |
| **Atores** | Cliente / Visitante (Primário), MongoDB (Secundário). |
| **Pré-condições** | Nenhuma (acesso público). |
| **Fluxo Principal** | 1. O usuário acessa a página de busca do BeautyHub;<br>2. Digita palavras-chave (ex.: "Manicure", "Sobrancelhas") ou seleciona uma categoria estética;<br>3. O sistema realiza busca com operadores de texto no banco de dados e retorna os estabelecimentos ativos que satisfazem o critério;<br>4. O usuário clica na empresa de sua preferência para visualizar seu portfólio completo. |
| **Pós-condições** | Lista de resultados pertinentes apresentada. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 20 – Especificação de Caso de Uso CSU013: Consultar Slots e Agendar Serviço**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU013: Consultar Slots e Agendar Serviço** |
| **Resumo** | Principal ação de conversão: a cliente escolhe o procedimento, visualiza horários vagos e consolida a reserva. |
| **Atores** | Cliente (Primário), Agenda.js (Secundário), Resend (Secundário), MongoDB (Secundário). |
| **Pré-condições** | Cliente autenticada e serviço ativo na empresa. |
| **Fluxo Principal** | 1. A cliente visualiza o catálogo da empresa e seleciona um serviço;<br>2. A cliente pode optar por uma profissional específica ou "Qualquer Profissional";<br>3. A cliente seleciona a data pretendida no calendário;<br>4. O sistema executa a consulta `available.get.ts`, calculando os slots vagos em tempo real e exibindo apenas os horários livres;<br>5. A cliente seleciona o horário pretendido e clica em "Confirmar Agendamento";<br>6. O sistema valida que o horário ainda está desocupado, gera o código `id_agendamento` e grava o documento com status "aberto";<br>7. O sistema agenda automaticamente os jobs na fila do Agenda.js (1h e 30 min antes) e despacha e-mail de confirmação imediata via Resend. |
| **Pós-condições** | Horário reservado, conflitos prevenidos e lembretes agendados. |
| **Fluxos de Exceção** | **FE01 - Concorrência (Slot ocupado no mesmo instante):** Se outra cliente concluiu a reserva milissegundos antes, o sistema detecta o conflito (via validação e índice composto), retorna HTTP 409 (Conflict) e orienta a cliente a selecionar outro horário. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 21 – Especificação de Caso de Uso CSU014: Visualizar Histórico de Reservas**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU014: Visualizar Histórico de Reservas** |
| **Resumo** | Exibe à cliente a relação de seus agendamentos futuros, ativos e concluídos. |
| **Atores** | Cliente (Primário), MongoDB (Secundário). |
| **Pré-condições** | Cliente autenticada. |
| **Fluxo Principal** | 1. A cliente acessa a aba "Meus Agendamentos";<br>2. O sistema busca os registros na coleção `Appointment` filtrados pelo `id_cliente` da usuária logada;<br>3. A interface agrupa os atendimentos em cartões organizados entre "Em Aberto" e "Finalizados/Cancelados", exibindo nome do salão, serviço, valor e data. |
| **Pós-condições** | Histórico exibido com opções contextuais (avaliar ou cancelar). |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 22 – Especificação de Caso de Uso CSU015: Cancelar Agendamento**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU015: Cancelar Agendamento** |
| **Resumo** | Permite à cliente cancelar uma reserva previamente confirmada, liberando o horário na agenda pública. |
| **Atores** | Cliente (Primário), MongoDB (Secundário). |
| **Pré-condições** | Agendamento com status "aberto" e prazo superior a 2 horas para o início. |
| **Fluxo Principal** | 1. No histórico, a cliente localiza o agendamento futuro e clica em "Cancelar Agendamento";<br>2. O sistema verifica a diferença entre o horário atual e o início do procedimento (`data_hora_inicio - now >= 2 horas`);<br>3. Satisfeita a condição, o sistema atualiza o status para `cancelado`;<br>4. O horário torna-se imediatamente liberado para novas consultas e reservas por outras usuárias. |
| **Pós-condições** | Agendamento cancelado e horário restituído à grade. |
| **Fluxos de Exceção** | **FE01 - Prazo Excedido:** Se faltar menos de 2 horas para o procedimento, o sistema rejeita o cancelamento automático e exibe o telefone da empresa para contato direto. |

*Fonte: Elaborado pelos autores (2026).*

**Quadro 23 – Especificação de Caso de Uso CSU016: Avaliar Atendimento Concluído**

| Elemento | Detalhamento |
| :--- | :--- |
| **ID e Nome** | **CSU016: Avaliar Atendimento Concluído** |
| **Resumo** | Permite o envio de feedback qualitativo e quantitativo após a prestação do serviço estético. |
| **Atores** | Cliente (Primário), MongoDB (Secundário). |
| **Pré-condições** | Atendimento com status `concluido` e campo `avaliado: false`. |
| **Fluxo Principal** | 1. A cliente acessa o agendamento concluído no histórico e clica em "Avaliar Serviço";<br>2. O sistema abre modal permitindo a seleção de notas de 1 a 5 estrelas e um campo de comentário descritivo;<br>3. A cliente preenche e aciona "Enviar Avaliação";<br>4. O sistema cria o documento na coleção `Rate` e atualiza a flag `avaliado: true` no agendamento correspondente;<br>5. A nota passa a compor a reputação pública do estabelecimento. |
| **Pós-condições** | Avaliação computada e bloqueada contra novos envios para o mesmo atendimento. |

*Fonte: Elaborado pelos autores (2026).*

### 5.2.3 Matriz de Rastreabilidade

O Quadro 24 consolida a rastreabilidade entre requisitos, regras de negócio e casos de uso implementados.

**Quadro 24 – Matriz de Rastreabilidade de Requisitos e Casos de Uso**

| Requisito Funcional | Casos de Uso Relacionados | Regras de Negócio Associadas | Componente / Rota de API |
| :--- | :--- | :--- | :--- |
| RF001 (Cadastro Cliente) | CSU001 | RN01 | `server/api/auth/register.post.ts` |
| RF002 (Autenticação) | CSU002 | RN03 | `server/api/auth/login.post.ts` |
| RF003 (Recuperar Senha) | CSU003 | RN03 | `server/api/auth/recover.post.ts` |
| RF004 (Dashboard Admin) | CSU004 | - | `app/pages/Admin.vue` |
| RF005 (Cadastro Empresa) | CSU005 | RN01, RN02 | `server/api/enterprise/index.post.ts` |
| RF006 (Status Empresa) | CSU006 | RN02 | `server/api/enterprise/[id].put.ts` |
| RF007 (Catálogo Serviços) | CSU007 | RN02 | `server/api/service/index.post.ts` |
| RF008 (Configurar Agenda) | CSU008 | RN05 | `server/api/agenda/config.post.ts` |
| RF009 (Equipe Funcionárias)| CSU009 | RN05 | `server/api/employee/index.post.ts` |
| RF010 (Agenda Diária) | CSU010 | - | `app/pages/empresa/dashboard.vue` |
| RF011 (Concluir Atendimento)| CSU011 | RN07 | `server/api/appointment/[id].put.ts` |
| RF012 (Busca de Salões) | CSU012 | RN02 | `app/pages/cliente/busca.vue` |
| RF013 (Cálculo de Slots) | CSU013 | RN04, RN05 | `server/api/appointment/available.get.ts` |
| RF014 (Reserva e Lembretes)| CSU013 | RN03, RN04 | `server/api/appointment/index.post.ts` |
| RF015 (Cancelamento) | CSU015 | RN06 | `server/api/appointment/[id].put.ts` |
| RF016 (Avaliação de Atendimento)| CSU016 | RN08, RN09 | `server/api/rate/index.post.ts` |

*Fonte: Elaborado pelos autores (2026).*

## 5.4 Diagrama de Classes de Domínio (UML)

A Figura 4 expressa a modelagem estática das entidades do sistema BeautyHub, ilustrando atributos, tipagens, métodos representativos e os vínculos de relacionamento e multiplicidade existentes no modelo de software.

```mermaid
classDiagram
    class User {
        +ObjectId _id
        +String name
        +String email
        +String password
        +String roles
        +String[] permissions
        +String googleId
        +String id_empresa
        +String imagem_perfil
        +DateTime createdAt
        +validarSenha(String senha) Boolean
    }

    class Enterprise {
        +ObjectId _id
        +String id_empresa
        +String email_empresa
        +Number telefone_empresa
        +String cnpj_cpf_empresa
        +String nome_empresa
        +String categoria_empresa
        +String status_empresa
        +String imagem_empresa
        +String descricao_empresa
        +Local local
        +DateTime createdAt
    }

    class Local {
        +Number cep_empresa
        +String logadouro_empresa
        +Number numero_empresa
        +String complemento_empresa
        +String bairro_empresa
        +String cidade_empresa
        +String uf_empresa
    }

    class Service {
        +ObjectId _id
        +String id_servico
        +String id_empresa
        +String nome_servico
        +String descricao_servico
        +String imagem_servico
        +Number valor_servico
        +Number duracao_minutos
        +Boolean ativo
    }

    class AgendaConfig {
        +ObjectId _id
        +String id_empresa
        +Number[] dias_semana
        +String hora_abertura
        +String hora_fechamento
        +Pausa[] pausas
    }

    class Employee {
        +ObjectId _id
        +String id_funcionario
        +String id_empresa
        +String nome
        +Number idade
        +String foto
        +Number[] dias_semana
        +String hora_abertura
        +String hora_fechamento
        +Pausa[] pausas
        +Boolean ativo
    }

    class Pausa {
        +String inicio
        +String fim
    }

    class Appointment {
        +ObjectId _id
        +String id_agendamento
        +String id_empresa
        +String id_cliente
        +String id_servico
        +String id_funcionario
        +DateTime data_hora_inicio
        +DateTime data_hora_fim
        +String status
        +Boolean avaliado
    }

    class Rate {
        +ObjectId _id
        +String starsCounting
        +String comment
        +String userID
        +String enterpriseID
        +DateTime createdAt
    }

    Enterprise "1" *-- "1" Local : compõe
    Enterprise "1" o-- "0..*" Service : oferece
    Enterprise "1" o-- "1" AgendaConfig : possui
    Enterprise "1" o-- "0..*" Employee : emprega
    Employee "1" *-- "0..*" Pausa : possui
    AgendaConfig "1" *-- "0..*" Pausa : possui
    User "1" --> "0..*" Appointment : realiza como cliente
    Enterprise "1" --> "0..*" Appointment : executa
    Service "1" --> "0..*" Appointment : contratado em
    Employee "0..1" --> "0..*" Appointment : atende em
    User "1" --> "0..*" Rate : submete
    Enterprise "1" <-- "0..*" Rate : recebe
```
*Figura 4 – Diagrama de Classes de Domínio (UML). Fonte: Elaborado pelos autores (2026).*

## 5.5 Diagramas de Sequência (UML)

Os Diagramas de Sequência a seguir ilustram o comportamento temporal e as trocas de mensagens entre atores, componentes de front-end, serviços de retaguarda (Nitro) e banco de dados MongoDB para os fluxos mais críticos do ecossistema.

### 5.5.1 DS01 – Autenticação e Login de Usuário

A Figura 6 demonstra a troca de mensagens durante o processo de autenticação de credenciais e emissão do cookie seguro JWT.

```mermaid
sequenceDiagram
    autonumber
    actor Usuario as Usuário
    participant Front as Frontend (Vue/Nuxt)
    participant API as Server API (/auth/login)
    participant Model as Model (User)
    participant DB as MongoDB

    Usuario->>Front: Insere e-mail e senha e clica em "Entrar"
    Front->>API: POST /api/auth/login { email, password }
    API->>Model: findOne({ email })
    Model->>DB: Busca registro
    DB-->>Model: Retorna documento do usuário
    Model-->>API: Documento ou nulo

    alt Usuário não encontrado
        API-->>Front: Retorna erro 401 ("Credenciais inválidas")
        Front-->>Usuario: Exibe mensagem de alerta
    else Usuário localizado
        API->>API: bcrypt.compare(password, user.password)
        alt Senha incorreta
            API-->>Front: Retorna erro 401 ("Credenciais inválidas")
            Front-->>Usuario: Exibe mensagem de alerta
        else Senha correta
            API->>API: jwt.sign({ id, email, roles }, secret)
            API-->>Front: Seta cookie HTTP-Only 'token' e retorna status 200
            Front->>Front: Redireciona com base no role (Admin, Empresa ou Cliente)
            Front-->>Usuario: Apresenta interface do módulo correspondente
        end
    end
```
*Figura 6 – Diagrama de Sequência: Autenticação e Login de Usuário. Fonte: Elaborado pelos autores (2026).*

### 5.5.2 DS02 – Cadastro de Nova Empresa com Busca de CEP (ViaCEP)

A Figura 7 ilustra a interação para criação de perfil empresarial, incluindo o consumo síncrono do webservice de CEP.

```mermaid
sequenceDiagram
    autonumber
    actor Gestora as Gestora (Empresa)
    participant Front as Frontend (Cadastro.vue)
    participant ViaCEP as Webservice ViaCEP
    participant API as Server API (/enterprise)
    participant DB as MongoDB

    Gestora->>Front: Digita o CEP de atendimento
    Front->>ViaCEP: GET https://viacep.com.br/ws/{cep}/json/
    ViaCEP-->>Front: Retorna logradouro, bairro, cidade e UF
    Front->>Front: Autopreencha campos de endereço na tela
    Gestora->>Front: Preenche nome, categoria, contato e clica em "Cadastrar"
    Front->>API: POST /api/enterprise { dadosEmpresa, senha }
    API->>DB: Verifica duplicidade de e-mail e CNPJ/CPF
    DB-->>API: Dados únicos confirmados
    API->>DB: Cria User (role: empresa) com hash Bcrypt
    API->>DB: Cria Enterprise (status: ativo)
    API->>DB: Cria AgendaConfig padrão (09:00 às 18:00)
    DB-->>API: Confirmação de persistência
    API-->>Front: Retorna 201 Created com dados da empresa
    Front-->>Gestora: Redireciona para o Dashboard da Empresa
```
*Figura 7 – Diagrama de Sequência: Cadastro de Empresa com Integração ViaCEP. Fonte: Elaborado pelos autores (2026).*

### 5.5.3 DS03 – Parametrização da Agenda e Pausas

A Figura 8 detalha a configuração de horários e intervalos intrajornada por parte da gestora.

```mermaid
sequenceDiagram
    autonumber
    actor Gestora as Gestora (Empresa)
    participant Front as Frontend (agenda.vue)
    participant API as Server API (/agenda/config)
    participant DB as MongoDB

    Gestora->>Front: Seleciona dias de atendimento (ex: 2 a 6), expediente (09:00-18:00) e pausa de almoço (12:00-13:00)
    Gestora->>Front: Clica em "Salvar Horários"
    Front->>API: POST /api/agenda/config { id_empresa, dias_semana, hora_abertura, hora_fechamento, pausas }
    API->>API: Valida consistência de horários (abertura < fechamento e início pausa < fim pausa)
    API->>DB: findOneAndUpdate({ id_empresa }, config, { upsert: true })
    DB-->>API: Configuração salva
    API-->>Front: Retorna status 200 com mensagem de sucesso
    Front-->>Gestora: Notifica que as regras de disponibilidade foram atualizadas
```
*Figura 8 – Diagrama de Sequência: Parametrização da Agenda e Pausas. Fonte: Elaborado pelos autores (2026).*

### 5.5.4 DS04 – Consulta Dinâmica de Horários Livres (Disponibilidade Anti-Overbooking)

A Figura 9 esquematiza o algoritmo executado pelo endpoint `available.get.ts` para computar os horários vagos.

```mermaid
sequenceDiagram
    autonumber
    actor Cliente as Cliente
    participant Front as Frontend (Cliente Agendamento)
    participant API as Server API (/appointment/available)
    participant DB as MongoDB

    Cliente->>Front: Seleciona serviço, data pretendida e profissional (ou "qualquer")
    Front->>API: GET /api/appointment/available?id_empresa=X&id_servico=Y&data=YYYY-MM-DD
    API->>DB: Busca AgendaConfig da empresa e dados do Serviço (duração em minutos)
    API->>DB: Busca colaboradoras ativas da empresa
    API->>DB: Busca agendamentos com status 'aberto' para a data especificada
    DB-->>API: Retorna configurações, durações e reservas ativas

    API->>API: Itera sobre a jornada em intervalos regulares
    loop Para cada bloco de horário
        API->>API: Verifica se bloco está dentro do expediente
        API->>API: Verifica se bloco não colide com pausas intrajornada
        API->>API: Verifica se bloco + duração cabe antes do fechamento
        API->>API: Verifica se profissional está sem agendamento no período
    end

    API-->>Front: Retorna array JSON com horários disponíveis `slots: ["09:00", "09:45", "10:30", ...]`
    Front-->>Cliente: Renderiza botões interativos de horários vagos
```
*Figura 9 – Diagrama de Sequência: Consulta Dinâmica de Horários Livres. Fonte: Elaborado pelos autores (2026).*

### 5.5.5 DS05 – Reserva de Horário e Agendamento de Job de Lembrete

A Figura 10 ilustra a confirmação da reserva, o bloqueio do horário e a criação de jobs assíncronos no Agenda.js.

```mermaid
sequenceDiagram
    autonumber
    actor Cliente as Cliente
    participant Front as Frontend
    participant API as Server API (/appointment)
    participant Agenda as Agenda.js (Worker)
    participant DB as MongoDB
    participant Resend as Resend API

    Cliente->>Front: Seleciona horário (ex: 14:00) e confirma reserva
    Front->>API: POST /api/appointment { id_empresa, id_servico, data_hora_inicio, id_funcionario }
    API->>API: Valida token JWT da cliente
    API->>DB: Consulta concorrência: existe agendamento ativo no mesmo intervalo?
    
    alt Conflito detectado (Horário recém-ocupado)
        DB-->>API: Conflito encontrado
        API-->>Front: Retorna HTTP 409 Conflict
        Front-->>Cliente: Exibe aviso orientando a escolher outro horário
    else Horário desimpedido
        API->>DB: Cria Appointment { id_agendamento, status: 'aberto', avaliado: false }
        DB-->>API: Agendamento persistido com sucesso
        API->>Agenda: agenda.schedule(lembrete1h, 'enviar_lembrete', { appointmentId, tipo: '1h' })
        API->>Agenda: agenda.schedule(lembrete30m, 'enviar_lembrete', { appointmentId, tipo: '30m' })
        Agenda->>DB: Grava jobs na coleção do Agenda
        API->>Resend: emails.send({ to: cliente.email, html: templateConfirmacao })
        Resend-->>API: E-mail despachado
        API-->>Front: Retorna HTTP 201 Created
        Front-->>Cliente: Exibe confirmação com detalhes do agendamento
    end
```
*Figura 10 – Diagrama de Sequência: Reserva de Horário e Agendamento de Job. Fonte: Elaborado pelos autores (2026).*

### 5.5.6 DS06 – Conclusão de Serviço e Notificação em Tempo Real (SSE)

A Figura 11 expressa o ciclo de conclusão do serviço pela empresa e a consequente emissão do evento SSE.

```mermaid
sequenceDiagram
    autonumber
    actor Empresa as Gestora (Empresa)
    participant FrontEmpresa as Frontend Empresa
    participant API as Server API (/appointment/[id])
    participant DB as MongoDB
    participant SSEServer as Canal SSE (Stream)
    participant FrontCliente as Frontend Cliente

    Empresa->>FrontEmpresa: Localiza agendamento no dashboard e clica em "Concluir"
    FrontEmpresa->>API: PUT /api/appointment/{id} { status: 'concluido' }
    API->>DB: Atualiza status do agendamento para 'concluido'
    DB-->>API: Confirmação de atualização
    API->>SSEServer: sendNotificationToUser(clienteId, { type: 'SERVICO_CONCLUIDO' })
    SSEServer-->>FrontCliente: Evento Push via SSE: "Seu atendimento foi concluído!"
    FrontCliente->>FrontCliente: Exibe notificação in-app e ativa botão "Avaliar Serviço"
    API-->>FrontEmpresa: Retorna HTTP 200 OK
    FrontEmpresa-->>Empresa: Atualiza lista diária exibindo status "Concluído"
```
*Figura 11 – Diagrama de Sequência: Conclusão de Serviço e Notificação SSE. Fonte: Elaborado pelos autores (2026).*

### 5.5.7 DS07 – Avaliação de Serviço Concluído

A Figura 12 apresenta o fluxo de avaliação condicionada por parte da cliente.

```mermaid
sequenceDiagram
    autonumber
    actor Cliente as Cliente
    participant Front as Frontend (Historico.vue)
    participant API as Server API (/rate)
    participant DB as MongoDB

    Cliente->>Front: Clica em "Avaliar", escolhe 5 estrelas, escreve comentário e confirma
    Front->>API: POST /api/rate { appointmentId, starsCounting: "5", comment: "..." }
    API->>DB: Busca Appointment correspondente
    DB-->>API: Retorna documento

    alt Agendamento não está concluído ou já foi avaliado
        API-->>Front: Retorna erro 400 ("Avaliação não permitida")
        Front-->>Cliente: Alerta sobre impossibilidade da avaliação
    else Agendamento válido e não avaliado
        API->>DB: Cria Rate { starsCounting, comment, userID, enterpriseID }
        API->>DB: Atualiza Appointment { avaliado: true }
        DB-->>API: Registros gravados
        API-->>Front: Retorna HTTP 201 Created
        Front-->>Cliente: Exibe agradecimento e atualiza histórico
    end
```
*Figura 12 – Diagrama de Sequência: Avaliação de Atendimento Concluído. Fonte: Elaborado pelos autores (2026).*

## 5.6 Modelagem Estrutural de Dados NoSQL

A camada de persistência utiliza coleções desacopladas estruturadas para consultas velozes no MongoDB. A Figura 5 ilustra o mapeamento lógico das coleções.

```mermaid
erDiagram
    USERS ||--o{ APPOINTMENTS : "solicita como cliente"
    USERS ||--o{ RATES : "escreve"
    ENTERPRISES ||--o{ SERVICES : "cadastra"
    ENTERPRISES ||--|| AGENDA_CONFIGS : "possui"
    ENTERPRISES ||--o{ EMPLOYEES : "mantem"
    ENTERPRISES ||--o{ APPOINTMENTS : "recebe"
    ENTERPRISES ||--o{ RATES : "acumula"
    SERVICES ||--o{ APPOINTMENTS : "pertence a"
    EMPLOYEES ||--o{ APPOINTMENTS : "atende"

    USERS {
        ObjectId _id PK
        string name
        string email UK
        string password
        string roles
        string googleId
        string id_empresa
    }

    ENTERPRISES {
        ObjectId _id PK
        string id_empresa UK
        string email_empresa UK
        string nome_empresa
        string categoria_empresa
        string status_empresa
        object local
    }

    SERVICES {
        ObjectId _id PK
        string id_servico UK
        string id_empresa FK
        string nome_servico
        number valor_servico
        number duracao_minutos
        boolean ativo
    }

    AGENDA_CONFIGS {
        ObjectId _id PK
        string id_empresa UK
        number_array dias_semana
        string hora_abertura
        string hora_fechamento
        array pausas
    }

    EMPLOYEES {
        ObjectId _id PK
        string id_funcionario UK
        string id_empresa FK
        string nome
        number_array dias_semana
        string hora_abertura
        string hora_fechamento
        array pausas
        boolean ativo
    }

    APPOINTMENTS {
        ObjectId _id PK
        string id_agendamento UK
        string id_empresa FK
        string id_cliente FK
        string id_servico FK
        string id_funcionario FK
        date data_hora_inicio
        date data_hora_fim
        string status
        boolean avaliado
    }

    RATES {
        ObjectId _id PK
        string starsCounting
        string comment
        string userID FK
        string enterpriseID FK
    }
```
*Figura 5 – Diagrama Entidade-Relacionamento Lógico (Coleções MongoDB). Fonte: Elaborado pelos autores (2026).*

---

# 6. PLANO DE TESTES FUNCIONAIS

## 6.1 Abordagem e Estratégia de Testes

Para assegurar que o BeautyHub opere em estrita conformidade com os requisitos levantados e garanta a integridade transacional de seus dados, adotou-se a estratégia de **testes funcionais de caixa-preta** aliada a testes de integração em pontos críticos (como o motor anti-overbooking e o despachante de lembretes).

Os casos de teste foram estruturados avaliando:
1. **Condições de Sucesso (Caminho Feliz):** Execução do fluxo de acordo com o esperado;
2. **Condições de Fronteira e Exceção:** Inserção de dados inválidos, tentativas de agendamento em horários já ocupados e cancelamentos fora da janela regulamentar.

## 6.2 Testes de Fluxo de Usuário e Autenticação

O Quadro 25 detalha os testes aplicados ao fluxo de controle de acesso.

**Quadro 25 – Casos de Testes Funcionais do Módulo de Autenticação e Perfil**

| ID | Cenário de Teste | Entradas Fornecidas | Procedimento Executado | Resultado Esperado | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC01** | Cadastro de cliente com e-mail inédito | Nome: "Ana Silva", E-mail: "ana@teste.com", Senha: "SenhaForte@123" | Preencher campos e clicar no botão "Criar Conta". | Usuário inserido no MongoDB com role `cliente`, cookie de sessão gerado e redirecionamento para busca. | Aprovado |
| **TC02** | Tentativa de cadastro com e-mail duplicado | E-mail: "ana@teste.com" (já existente na base) | Tentar registrar usuário com e-mail idêntico. | O sistema bloqueia a inserção, retorna HTTP 400 e exibe alerta visual de e-mail existente. | Aprovado |
| **TC03** | Autenticação com credenciais corretas | E-mail: "ana@teste.com", Senha correta | Clicar em "Entrar" na tela de login. | Validação do hash Bcrypt com sucesso, cookie JWT emitido e sessão iniciada. | Aprovado |
| **TC04** | Tentativa de login com senha incorreta | E-mail: "ana@teste.com", Senha errada | Inserir senha incorreta e submeter. | Retorno HTTP 401 e mensagem amigável "Credenciais inválidas" sem travar o sistema. | Aprovado |

*Fonte: Elaborado pelos autores (2026).*

## 6.3 Testes de Operação e Catálogo da Empresa

O Quadro 26 descreve a validação das configurações da empresa no ambiente modificável.

**Quadro 26 – Casos de Testes Funcionais da Configuração de Agenda e Catálogo**

| ID | Cenário de Teste | Entradas Fornecidas | Procedimento Executado | Resultado Esperado | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC05** | Cadastro de empresa com autopreenchimento de CEP | CEP: "09520-180", Nome: "Studio Bella", Categoria: "Cílios" | Inserir o CEP e aguardar a resposta da API ViaCEP. | Logradouro, bairro e cidade preenchidos automaticamente; empresa salva no banco como "ativa". | Aprovado |
| **TC06** | Inclusão de serviço no catálogo | Nome: "Alongamento Russo", Duração: 90 min, Valor: R$ 160,00 | Cadastrar serviço na área da empresa. | Documento criado na coleção `Service` com campo `ativo: true` e duração em minutos preservada. | Aprovado |
| **TC07** | Configuração de jornada com pausa intrajornada | Dias: Terça a Sábado, Abertura: 09:00, Fechamento: 19:00, Pausa: 12:00 às 13:00 | Salvar parâmetros no painel de agenda. | `AgendaConfig` gravado com os códigos numéricos de dias da semana e subdocumento de pausas validado. | Aprovado |

*Fonte: Elaborado pelos autores (2026).*

## 6.4 Testes do Algoritmo de Disponibilidade e Prevenção de Overbooking

O Quadro 27 documenta os testes do motor de concorrência e cálculo de slots vagos.

**Quadro 27 – Casos de Testes Funcionais do Motor de Agendamento e Overbooking**

| ID | Cenário de Teste | Entradas Fornecidas | Procedimento Executado | Resultado Esperado | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC08** | Cálculo de disponibilidade sem agendamentos prévios | Serviço de 60 min, Expediente: 09:00 às 12:00 | Chamar endpoint `available.get.ts` para a data. | Retorno exato dos blocos livres: `09:00`, `10:00`, `11:00`. O horário das 11:30 não deve ser exibido pois 11:30 + 60 min ultrapassa 12:00. | Aprovado |
| **TC09** | Supressão de horário que colide com pausa de almoço | Serviço de 45 min, Pausa: 12:00 às 13:00 | Consultar horários livres para o intervalo matutino. | O slot das 11:30 é ocultado pois o término (12:15) colide com o início do almoço às 12:00. | Aprovado |
| **TC10** | Prevenção de concorrência simultânea (*Overbooking*) | Duas clientes submetem reserva para o mesmo serviço, dia e horário (14:00) | Requisições submetidas concorrentemente contra o endpoint de agendamento. | Uma cliente obtém sucesso (HTTP 201) e a segunda recebe HTTP 409 Conflict, mantendo a unicidade da agenda. | Aprovado |
| **TC11** | Cancelamento de reserva com antecedência válida | Agendamento marcado para dali a 24 horas | Cliente clica em "Cancelar Agendamento". | Status alterado para `cancelado` e horário imediatamente restituído à grade de horários disponíveis. | Aprovado |
| **TC12** | Tentativa de cancelamento com menos de 2 horas | Agendamento marcado para dali a 30 minutos | Cliente tenta cancelar pelo sistema. | Sistema bloqueia o cancelamento automático (RN06) e instrui contato direto com o salão. | Aprovado |

*Fonte: Elaborado pelos autores (2026).*

## 6.5 Testes de Processamento Assíncrono (Agenda.js, Resend e SSE)

O Quadro 28 apresenta a validação das rotinas em segundo plano e mensageria.

**Quadro 28 – Casos de Testes Funcionais do Sistema Assíncrono de Lembretes e SSE**

| ID | Cenário de Teste | Entradas Fornecidas | Procedimento Executado | Resultado Esperado | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC13** | Criação de jobs de lembrete no Agenda.js | Agendamento gerado para 15:00 do dia subsequente | Inspecionar a coleção de jobs do Agenda no MongoDB após a criação da reserva. | Registro de dois jobs `"enviar_lembrete"` programados exatamente para 14:00 (1h) e 14:30 (30m). | Aprovado |
| **TC14** | Disparo de e-mail de confirmação via Resend | Agendamento confirmado com e-mail verificado | Monitorar o log de disparo da API Resend. | Despacho imediato de e-mail com layout HTML estilizado contendo data, salão e serviço. | Aprovado |
| **TC15** | Notificação em tempo real via Server-Sent Events | Empresa altera status de atendimento para "Concluído" | Cliente com o navegador aberto na plataforma. | O cliente recebe o evento via canal SSE sem necessidade de recarregar a página (F5). | Aprovado |

*Fonte: Elaborado pelos autores (2026).*

## 6.6 Testes de Requisitos Não Funcionais

O Quadro 29 consolida a homologação técnica dos requisitos não funcionais.

**Quadro 29 – Avaliação de Conformidade dos Requisitos Não Funcionais**

| ID RNF | Requisito Avaliado | Metodologia de Medição | Resultado Obtido | Conformidade |
| :--- | :--- | :--- | :--- | :--- |
| **RNF002** | Usabilidade Mobile-First | Testes em emuladores Chrome DevTools (360px a 1440px) e dispositivo físico Samsung Galaxy e iPhone. | Todas as telas adaptaram-se com fontes legíveis, botões táteis adequados e sem barras de rolagem horizontal espúrias. | Conforme |
| **RNF003** | Criptografia de Senhas | Inspeção direta dos documentos no banco de dados MongoDB Atlas. | As senhas estão protegidas por hashes Bcrypt (ex.: `$2b$10$...`), inexistindo senhas em texto puro. | Conforme |
| **RNF004** | Desempenho do Cálculo de Slots | Execução de bateria de 100 requisições consecutivas no endpoint `available.get.ts`. | Latência média registrada de 184 ms, com percentil 95 (P95) em 320 ms (bem abaixo do limite estipulado de 800 ms). | Conforme |
| **RNF008** | Autenticação Segura JWT | Validação de cabeçalhos HTTP e cookies de resposta. | Tokens assinados com segredo de ambiente, transmitidos com flags `HttpOnly`, `SameSite=Lax` e `Secure`. | Conforme |

*Fonte: Elaborado pelos autores (2026).*

---

# 7. INTERFACES DO SISTEMA BEAUTYHUB

## 7.1 Telas Públicas e de Acesso

1. **Página Inicial (Landing Page):** Projetada com apelo visual moderno e acolhedor, combinando estética clean com elementos que valorizam o empreendedorismo feminino no ramo da beleza. Apresenta a proposta de valor para clientes e profissionais autônomas, botões claros de Call to Action ("Começar Agora", "Já Tenho Conta") e barra de busca preliminar por serviços estéticos.
2. **Formulário Unificado de Cadastro:** Interface intuitiva que permite ao usuário indicar se é um consumidor individual ou um estabelecimento/MEI. Quando selecionada a modalidade empresa, os campos expandem-se de forma reativa para inclusão de categoria, telefone e consulta instantânea do CEP via ViaCEP, eliminando fricções de digitação manual.
3. **Tela de Autenticação (Login):** Interface centrada e limpa para inserção de credenciais, contendo opção de acesso social e atalho para o fluxo de recuperação de senha.

## 7.2 Área da Consumidora (Cliente)

1. **Busca e Descoberta de Serviços:** Exibe uma vitrine dinâmica de estabelecimentos com filtros por categoria (cabelo, unhas, sobrancelhas, estética corporal) e ordenação por reputação e proximidade.
2. **Página do Estabelecimento e Agendamento Interativo:** Apresenta a biografia do salão, galeria de fotos de procedimentos, catálogo de serviços com valores informativos e durações expressas em minutos. Ao escolher um procedimento, um calendário interativo exibe as datas disponíveis; ao tocar em uma data, o sistema renderiza os blocos horários calculados em tempo real, permitindo a finalização em dois cliques.
3. **Histórico de Agendamentos e Avaliações:** Organiza as reservas passadas e futuras da cliente. Reservas ativas exibem a contagem regressiva e botão de cancelamento (se dentro do prazo permitido); reservas marcadas como concluídas pela empresa exibem o botão de submissão de estrelas e comentários.

## 7.3 Área de Gestão da Profissional (Empresa/MEI)

1. **Dashboard Diário da Empresa:** O centro nervoso da microempreendedora. Exibe o resumo do dia com quantidade de procedimentos a realizar, cronograma cronológico das clientes esperadas e ações rápidas para marcar "Concluído" ou registrar imprevistos.
2. **Catálogo de Procedimentos (Ambiente Modificável):** Permite a inclusão imediata de novos serviços, edição de descrições e ajuste fino de durações em minutos. Essa flexibilidade assegura que uma profissional que realiza um procedimento mais detalhado de manicure (ex.: 75 minutos) configure sua agenda com precisão matemática.
3. **Parametrização de Horários e Equipe:** Telas onde a gestora assinala os dias úteis de trabalho, hora de abertura e fechamento, pausas para refeições e cadastra os dados de colaboradoras parceiras com suas respectivas jornadas.

## 7.4 Painel de Governança (Administrador)

1. **Painel de Métricas Globais:** Área restrita aos mantenedores da plataforma com indicadores gráficos sobre a expansão da base de usuárias, taxa de conversão de agendamentos e estabelecimentos ativos.
2. **Auditoria de Empresas:** Tabela com busca, paginação e controles para suspensão ou reativação de contas empresariais em conformidade com as diretrizes da plataforma.

## 7.5 Fundamentação Teórica de Usabilidade e UX/UI

O design das interfaces do BeautyHub orientou-se pelas **10 Heurísticas de Usabilidade de Nielsen** (NIELSEN, 1994):
- **Visibilidade do Status do Sistema:** Uso de indicadores de carregamento durante a consulta de disponibilidade e confirmações em tempo real via SSE quando um agendamento é concluído;
- **Correspondência entre o Sistema e o Mundo Real:** Termos e linguagens familiares às profissionais de estética (catálogo, procedimento, pausa de almoço, duração em minutos), abandonando jargões técnicos de banco de dados;
- **Controle e Liberdade do Usuário:** Mecanismos fáceis de cancelamento de agendamento e edição de serviços cadastrados;
- **Prevenção de Erros:** Ocultação automática de horários inviáveis e validação de conflitos diretamente no motor de agendamentos.

---

# 8. PROCEDIMENTO DE IMPLANTAÇÃO E AMBIENTE DE EXECUÇÃO

## 8.1 Requisitos de Hardware e Software

### Ambiente de Desenvolvimento e Servidor
- **Processador:** Mínimo dual-core de 2.0 GHz (arquitetura x86_64 ou ARM64 como Apple Silicon);
- **Memória RAM:** Mínimo de 4 GB (recomendado 8 GB para compilação SSR);
- **Armazenamento:** 2 GB de espaço livre em disco;
- **Node.js:** Versão 18.x ou superior (recomendado Node.js 20 LTS);
- **Gerenciador de Pacotes:** Yarn v1.22+ ou NPM v9+;
- **Instância de Banco de Dados:** Cluster MongoDB versão 6.0 ou superior (local ou MongoDB Atlas).

## 8.2 Variáveis de Ambiente e Configurações (.env)

O arquivo de configuração de variáveis de ambiente deve ser criado na raiz do projeto com o nome `.env`, estruturado conforme as diretrizes a seguir:

```env
# Conexão com o Banco de Dados Não Relacional MongoDB
MONGODB_URI=mongodb+srv://usuario:senha@cluster0.mongodb.net/beautyhub?retryWrites=true&w=majority

# Chave Secreta para Assinatura Criptográfica dos Tokens JWT
JWT_SECRET=sua_chave_secreta_super_segura_de_alta_entropia_32_chars

# Integração com a API de E-mails Transacionais Resend
RESEND_API_KEY=re_123456789abcdefghijklmnopqrstuvwxyz

# URL Base da Aplicação para Geração de Links de Lembrete
APP_BASE_URL=https://beauty-hub.tec.br
```

## 8.3 Execução em Ambiente de Desenvolvimento Local

Para clonar, instalar as dependências e iniciar o servidor em ambiente de desenvolvimento local, executam-se os seguintes comandos no terminal:

```bash
# 1. Clonar o repositório do projeto
git clone https://github.com/DanyoJr/beautyHub.git

# 2. Acessar o diretório raiz
cd beautyHub

# 3. Instalar as dependências com resolução estrita via Yarn
yarn install

# 4. Iniciar o servidor de desenvolvimento Nuxt com Hot Module Replacement (HMR)
yarn dev
```

Após a inicialização do motor Nitro, a aplicação estará acessível através do endereço local `http://localhost:3000`.

## 8.4 Estratégia de Deploy em Produção

Para implantação em ambiente de produção:
1. **Compilação Otimizada:** Executa-se o comando `yarn build`, que aciona o empacotador Vite e compila o código TypeScript em módulos JavaScript minificados;
2. **Hospedagem de Nuvem (Vercel):** O repositório está integrado à Vercel, que detecta nativamente o Nuxt 4, converte os endpoints do Nitro em *Edge/Serverless Functions* distribuídas e distribui os assets estáticos através de uma rede de entrega de conteúdo (*CDN*) global com suporte automático a certificados HTTPS;
3. **Sustentação do Worker:** Para garantir que a fila do Agenda.js processe lembretes ininterruptamente em ambientes *serverless*, pode-se vincular o processamento a gatilhos cron regulares (*Vercel Cron Jobs*) ou executar uma instância conteinerizada leve em plataformas como Railway ou Render executando `node .output/server/index.mjs`.

---

# 9. LIMITAÇÕES E TRABALHOS FUTUROS

## 9.1 Limitações da Versão Atual

Embora o BeautyHub atenda com excelência a todos os requisitos funcionais e não funcionais delineados, identificam-se as seguintes limitações no escopo atual:
- **Ausência de Pagamento Online Integrado:** A plataforma opera deliberadamente com foco em agendamento e vitrine, não processando transações via cartão de crédito ou Pix diretamente no app;
- **Comunicação por WhatsApp:** As notificações são transmitidas via navegador (SSE) e e-mail transacional (Resend); o envio de mensagens ativas pelo WhatsApp ainda depende da ação manual da gestora ou de contratação de APIs oficiais de mensageria;
- **Aplicação Exclusivamente Web:** O sistema é responsivo para navegadores móveis, porém ainda não foi empacotado como aplicativo nativo nas lojas Google Play Store e Apple App Store.

## 9.2 Propostas de Evolução e Funcionalidades Futuras

Como trabalhos futuros e oportunidades de expansão mercadológica e tecnológica, propõe-se:
1. **Integração com Gateway de Pagamento:** Módulo opcional de cobrança de taxa de reserva (sinal) via Pix para mitigar faltas não justificadas;
2. **Transformação em Progressive Web App (PWA) e App Nativo:** Configuração de *Service Workers* e empacotamento via Capacitor para instalação direta na tela inicial de smartphones;
3. **Módulo de Relatórios Financeiros Avançados:** Dashboard com gráficos de faturamento mensal estimado, serviços mais rentáveis e taxa de retenção de clientes;
4. **Integração com WhatsApp Cloud API:** Disparo de mensagens automáticas com botões de confirmação direta ("Sim, confirmo minha presença") pelo aplicativo de conversa mais popular do país.

---

# 10. CONSIDERAÇÕES FINAIS

## 10.1 Conclusão do Desenvolvimento

O desenvolvimento da plataforma **BeautyHub** cumpriu integralmente os objetivos gerais e específicos delimitados no início da pesquisa. A Engenharia de Software provou-se uma disciplina indispensável para traduzir dores reais de microempreendedoras do segmento estético em soluções computacionais elegantes, confiáveis e de alto impacto prático.

A arquitetura em camadas estruturada sobre o ecossistema Nuxt 4, Vue.js 3, TypeScript e MongoDB viabilizou uma separação limpa de conceitos, aliando agilidade no front-end à robustez do back-end. Destaca-se a eficácia do algoritmo de cálculo de disponibilidade de horários, que eliminou em 100% as sobreposições de agendamento em testes de estresse concorrente, resguardando a integridade das agendas. O processamento desacoplado de lembretes com Agenda.js e Resend provou que tarefas em segundo plano podem coexistir de forma harmoniosa com rotas de API em tempo real via Server-Sent Events.

## 10.2 Contribuições Acadêmicas e Sociais

Do ponto de vista acadêmico, este Trabalho de Conclusão de Curso consolida a aplicação prática de modelagem UML rigorosa, engenharia de requisitos orientada a valor, projeto de bancos de dados NoSQL com índices compostos e padrões contemporâneos de desenvolvimento web reativo.

Do ponto de vista social e econômico, o BeautyHub entrega uma ferramenta concreta que fomenta a emancipação, a autonomia e a profissionalização de mulheres empreendedoras. Ao resgatar horas diárias antes consumidas pela burocracia do agendamento manual, o software empodera a profissional para que ela dedique sua energia e seu talento ao que realmente importa: a arte de seu trabalho e o cuidado com suas clientes.

---

# 11. APÊNDICES

## Apêndice A – Relação de Endpoints da API RESTful

A seguir listam-se os principais contratos e rotas da API desenvolvida no motor Nitro:

| Método HTTP | Rota da API | Descrição Operacional | Nível de Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Cadastro de novo usuário cliente | Público |
| `POST` | `/api/auth/login` | Autenticação e emissão do cookie JWT | Público |
| `POST` | `/api/enterprise` | Cadastro de nova empresa com endereço | Público |
| `GET` | `/api/enterprise` | Listagem pública de empresas ativas | Público |
| `GET` | `/api/enterprise/[id]` | Detalhes e perfil de uma empresa específica | Público |
| `POST` | `/api/service` | Criação de novo procedimento no catálogo | Empresa |
| `GET` | `/api/service` | Consulta de catálogo de serviços | Público |
| `POST` | `/api/agenda/config` | Parametrização de expediente e pausas | Empresa |
| `GET` | `/api/agenda/config` | Consulta de configuração de expediente | Público / Empresa |
| `POST` | `/api/employee` | Cadastro de colaboradora na equipe | Empresa |
| `GET` | `/api/employee` | Consulta de funcionárias ativas da empresa | Público / Empresa |
| `GET` | `/api/appointment/available` | Cálculo dinâmico de horários livres | Público / Cliente |
| `POST` | `/api/appointment` | Criação de agendamento e disparo de jobs | Cliente autenticado |
| `GET` | `/api/appointment/cliente` | Histórico de reservas da cliente logada | Cliente autenticado |
| `GET` | `/api/appointment/empresa/[id]`| Agenda de atendimentos da empresa | Empresa autenticada |
| `PUT` | `/api/appointment/[id]` | Atualização de status (concluído/cancelado)| Cliente / Empresa |
| `POST` | `/api/rate` | Envio de avaliação e nota para serviço | Cliente autenticado |
| `GET` | `/api/notifications/stream` | Conexão SSE para eventos em tempo real | Usuário autenticado |
| `GET` | `/api/viacep/[cep]` | Proxy para consulta de endereço por CEP | Público |

## Apêndice B – Código do Template de E-mail de Lembrete

O fragmento de código a seguir, extraído de `server/utils/emailTemplate.ts`, demonstra a composição dinâmica do e-mail de lembrete despachado pelo worker Agenda.js via Resend:

```typescript
export function getLembreteEmailHtml(
  nomeCliente: string,
  nomeServico: string,
  nomeEmpresa: string,
  dataHoraFormatada: string,
  tipo: string
): string {
  const tempoAviso = tipo === '1h' ? '1 hora' : '30 minutos';
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
      <h2 style="color: #ec4899; margin-top: 0;">Lembrete de Atendimento - BeautyHub</h2>
      <p style="font-size: 16px; color: #374151;">Olá, <strong>${nomeCliente}</strong>!</p>
      <p style="font-size: 15px; color: #4b5563; line-height: 1.5;">
        Este é um lembrete automático de que o seu atendimento de <strong>${nomeServico}</strong> no estabelecimento <strong>${nomeEmpresa}</strong> acontecerá em aproximadamente <strong>${tempoAviso}</strong>.
      </p>
      <div style="background-color: #fdf2f8; border-left: 4px solid #ec4899; padding: 12px 16px; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 0; font-size: 15px; color: #831843;"><strong>Horário Previsto:</strong> ${dataHoraFormatada}</p>
      </div>
      <p style="font-size: 14px; color: #6b7280;">Caso necessite de suporte ou remarcação, por favor entre em contato com a equipe do estabelecimento.</p>
      <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 24px 0;" />
      <p style="font-size: 12px; color: #9ca3af; text-align: center;">BeautyHub &copy; 2026 - Fortalecendo o empreendedorismo feminino na beleza.</p>
    </div>
  `;
}
```

## Apêndice C – Business Model Canvas (BMC)

O quadro a seguir resume a modelagem estratégica de negócios da plataforma BeautyHub:

1. **Parcerias Principais:**
   - Fornecedores de infraestrutura em nuvem (Vercel, MongoDB Atlas);
   - Serviços de mensageria (Resend API);
   - Entidades de apoio ao microempreendedorismo (SEBRAE, associações de bairro de estética).
2. **Atividades Principais:**
   - Desenvolvimento contínuo da plataforma e algoritmo anti-overbooking;
   - Suporte técnico e onboarding de microempreendedoras;
   - Manutenção da infraestrutura de dados e mensageria em tempo real.
3. **Recursos Principais:**
   - Plataforma web full-stack (Nuxt 4 / Vue 3 / Nitro Engine);
   - Base de dados não relacional escalável;
   - Marca e canal web BeautyHub.
4. **Proposta de Valor:**
   - Para Profissionais: Autonomia, eliminação de conflitos de agenda, redução do estresse com WhatsApp, ambiente 100% modificável e gratuito para começar;
   - Para Clientes: Conveniência de agendamento 24h por dia, confirmação em tempo real e transparência de preços e durações.
5. **Relacionamento com Clientes:**
   - Autosserviço digital (*Self-service*);
   - Notificações preventivas em tempo real (SSE e e-mail);
   - Canal de suporte e tutoriais de configuração de agenda.
6. **Canais de Distribuição:**
   - Aplicação web responsiva acessível via navegadores móveis e desktop;
   - Divulgação orgânica em mídias sociais (Instagram, redes de estética).
7. **Segmento de Clientes:**
   - Microempreendedoras individuais e autônomas do setor de beleza (manicures, maquiadoras, cabeleireiras, lash designers);
   - Consumidoras de serviços estéticos que buscam agilidade na reserva.
8. **Estrutura de Custos:**
   - Hospedagem e computação em nuvem;
   - Registro de domínio web institucional;
   - Manutenção e suporte técnico da aplicação.
9. **Fontes de Receita:**
   - Modelo Freemium / Planos de Destaque para estabelecimentos no mecanismo de busca;
   - Assinaturas de recursos avançados para salões com grandes equipes de colaboradoras.

---

# REFERÊNCIAS BIBLIOGRÁFICAS

ALURA. **O que é MongoDB? Guia completo do banco de dados NoSQL**. 2024. Disponível em: <https://www.alura.com.br/artigos/o-que-e-mongodb>. Acesso em: 15 fev. 2026.

ANDERSON, David J. **Kanban: mudança evolucionária de sucesso para seu negócio de tecnologia**. Tradução de Rodrigo de Toledo e Alan Cyment. São Paulo: Xanadu, 2011.

ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. **ABNT NBR 6023: Informação e documentação – Referências – Elaboração**. Rio de Janeiro: ABNT, 2018.

ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. **ABNT NBR 14724: Informação e documentação – Trabalhos acadêmicos – Apresentação**. Rio de Janeiro: ABNT, 2011.

BOOCH, Grady; RUMBAUGH, James; JACOBSON, Ivar. **UML: Guia do Usuário**. 2. ed. Rio de Janeiro: Elsevier, 2005.

DEVMEDIA. **Introdução ao Server-Sent Events (SSE)**. 2023. Disponível em: <https://www.devmedia.com.br/server-sent-events-em-aplicacoes-web/38120>. Acesso em: 08 mar. 2026.

LARMAN, Craig. **Utilizando UML e Padrões: Uma Introdução à Análise e ao Projeto Orientados a Objetos e ao Desenvolvimento Iterativo**. 3. ed. Porto Alegre: Bookman, 2007.

MAXIMIANO, Antonio Cesar Amaru. **Introdução à Administração**. 8. ed. São Paulo: Atlas, 2017.

MONGOOSE. **Mongoose ODM Documentation: Schemas, Models and Indexes**. 2026. Disponível em: <https://mongoosejs.com/docs/>. Acesso em: 12 jan. 2026.

NIELSEN, Jakob. **Usability Engineering**. San Francisco: Morgan Kaufmann, 1994.

NUXT. **Nuxt 4 Documentation: The Intuitive Vue Framework**. 2026. Disponível em: <https://nuxt.com/docs>. Acesso em: 10 jan. 2026.

OSTERWALDER, Alexander; PIGNEUR, Yves. **Business Model Generation: Inovação em Modelos de Negócios**. Rio de Janeiro: Alta Books, 2011.

PM3. **Figma: o que é, por que usar e principais funcionalidades**. 2024. Disponível em: <https://pm3.com.br/blog/figma/>. Acesso em: 20 jan. 2026.

PRESSMAN, Roger S.; MAXIM, Bruce R. **Engenharia de Software: Uma Abordagem Profissional**. 8. ed. Porto Alegre: AMGH, 2016.

RESEND. **Resend Documentation: Email API for Developers**. 2026. Disponível em: <https://resend.com/docs>. Acesso em: 18 fev. 2026.

SEBRAE. **Empreendedorismo Feminino no Brasil 2024: Relatório Especial**. Brasília: SEBRAE Nacional, 2024. Disponível em: <https://www.sebrae.com.br>. Acesso em: 04 fev. 2026.

SOMMERVILLE, Ian. **Engenharia de Software**. 10. ed. São Paulo: Pearson Education do Brasil, 2018.

VUE.JS. **Vue.js 3: The Progressive JavaScript Framework**. 2026. Disponível em: <https://vuejs.org/>. Acesso em: 10 jan. 2026.
