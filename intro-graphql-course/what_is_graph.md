## What is Graph in GraphQL

The Graph in GraphQL represents the data from the database that is accessible to the developer to use them and allows the backend developer to control what part of the database they have access. Thus the frontend developer can control which part of the application has access to some of the data, without over-fetching. Furthermore, the backend developer can link the data they want to access and how to access them without all the overhead of creating multiple versions of the same route.

### A Simple Example

```
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```

#### Types

 - Types represent a collection of *fields*; in this example, `Character` is the type.

#### Fields

 - Fields descript what the type does and tell the developer what can access for that type, `name` and `appearsIn` are the fields in the example.

#### Varilbles

 - `String` is one of the built-in _scalar_ types - these are types that resolve to a single scalar object, and can't have sub-selections in the query. We'll go over scalar types later.
 - `String!` means that the field is _non-nullable_, meaning that the GraphQL service promises always to give you value when you query this field. In the type of language, we'll represent those with an exclamation mark.
 - `[Episode!]!` represents an array of *Episode* objects. Since it is also _non-nullable_, you can always expect an array (with zero or more items) when you query the `appearsIn` field. Moreover, since Episode! is also non-nullable, you can always expect every item of the array to be an Episode object.
