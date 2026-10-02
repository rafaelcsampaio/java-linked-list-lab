# 🔗 Java Linked List Lab

Plataforma web interativa para estudo de **listas simplesmente e duplamente encadeadas em Java**.

O projeto foi desenvolvido como material de apoio ao estudo de **Estruturas de Dados**, transformando conceitos como `inicio`, `fim`, `proximo`, `anterior`, inserção, remoção e percurso em representações visuais e interativas.

🌐 **Aplicação online:**  
https://rafaelcsampaio.github.io/java-linked-list-lab/

---

## ✨ Funcionalidades

- 📚 Teoria visual sobre listas encadeadas
- ➡️ Lista simplesmente encadeada
- ↔️ Lista duplamente encadeada
- 🧩 Simulador interativo de operações
- ➕ Inserção de elementos
- 🗑️ Remoção de elementos
- 🔍 Busca de elementos
- 🛣️ Percurso da lista
- ↩️ Histórico e desfazer operações
- 💻 Código Java interativo
- 🧠 Execução passo a passo de `while`, `if` e alterações de referências
- 📊 Visualização das variáveis durante a execução
- ✨ Introdução visual a Generics (`<T>`)

---

## 🎯 Objetivo

Listas encadeadas podem ser difíceis de compreender apenas observando o código.

Por exemplo:

```java
fim.proximo = novoNo;
fim = novoNo;
```

Apesar de semelhantes, essas instruções realizam tarefas diferentes:

- `fim.proximo = novoNo` cria uma ligação entre dois nós;
- `fim = novoNo` altera a referência que representa o final da lista.

O **Java Linked List Lab** permite visualizar essas alterações acontecendo passo a passo, tornando mais clara a relação entre código, referências e estado da estrutura.

---

## 🔗 Lista simplesmente encadeada

```text
inicio
  ↓
[Ana] → [Bruno] → [Carlos] → null
                              ↑
                             fim
```

Cada nó possui uma referência para o próximo elemento da estrutura.

---

## ↔️ Lista duplamente encadeada

```text
null ← [Ana] ⇄ [Bruno] ⇄ [Carlos] → null
         ↑                    ↑
       inicio                fim
```

Cada nó possui referências para o elemento anterior e para o próximo.

---

## 🧩 Simulador interativo

O simulador permite visualizar operações comuns realizadas em listas encadeadas, como:

- inserção de elementos;
- remoção de elementos;
- busca;
- percurso da estrutura;
- alteração das referências entre os nós.

Os nós e suas conexões são atualizados visualmente durante cada operação, facilitando a compreensão do comportamento da estrutura.

---

## 💻 Código interativo

A área de prática permite clicar diretamente em linhas do código Java para observar seu efeito na estrutura.

Exemplo:

```java
while (atual != null) {
    System.out.println(atual.elemento);
    atual = atual.proximo;
}
```

A aplicação apresenta cada execução do laço separadamente:

```text
Execução 1
atual → Ana

Execução 2
atual → Bruno

Execução 3
atual → Carlos

Execução 4
atual → null
```

Também é possível acompanhar o estado de variáveis como:

```text
atual
anterior
inicio
fim
```

Isso aproxima a experiência de um **depurador educacional de estruturas de dados**, permitindo compreender não apenas qual linha está sendo executada, mas também como as referências mudam ao longo da execução.

---

## ✨ Generics

O projeto também apresenta de forma visual o uso de Generics em Java:

```java
class No<T> {
    T elemento;
    No<T> proximo;
}
```

Isso permite reutilizar a mesma estrutura para diferentes tipos:

```java
ListaEncadeada<String> nomes;
ListaEncadeada<Integer> numeros;
ListaEncadeada<Aluno> alunos;
```

---

## 🛠️ Tecnologias

- React
- Vite
- JavaScript
- CSS
- Motion
- Lucide React
- React Router
- Java nos exemplos de estruturas de dados
- GitHub Actions
- GitHub Pages

---

## 📂 Estrutura do projeto

```text
src/
├── components/
│   ├── code/
│   ├── layout/
│   ├── linkedList/
│   └── ui/
│
├── pages/
│   ├── Home/
│   ├── Theory/
│   ├── Simulator/
│   ├── CodeVisualizer/
│   └── Generics/
│
└── styles/
```

---

## 🚀 Executando localmente

Clone o repositório:

```bash
git clone https://github.com/rafaelcsampaio/java-linked-list-lab.git
```

Entre na pasta:

```bash
cd java-linked-list-lab
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Para verificar o código com ESLint:

```bash
npm run lint
```

Para gerar a versão de produção:

```bash
npm run build
```

---

## 🌐 Deploy

A aplicação está publicada com **GitHub Pages**:

https://rafaelcsampaio.github.io/java-linked-list-lab/

O deploy é automatizado com **GitHub Actions**. Alterações enviadas para a branch `main` passam pelo processo de build e são publicadas automaticamente.

---

## 📚 Contexto acadêmico

O projeto foi desenvolvido como material educacional de apoio à disciplina de **Estrutura de Dados**, especialmente para auxiliar na compreensão visual de listas simplesmente e duplamente encadeadas.

A proposta é complementar a implementação tradicional em Java com uma ferramenta que permita visualizar referências, nós, operações e fluxo de execução de forma interativa.

---

## 📄 Licença

Projeto desenvolvido para fins educacionais.